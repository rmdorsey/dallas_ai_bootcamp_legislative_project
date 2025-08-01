from typing_extensions import TypedDict
from typing import Annotated
from langchain_ollama import ChatOllama
from langgraph.graph import MessagesState, StateGraph, START
from langgraph.prebuilt import ToolNode, tools_condition
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage
from langgraph.checkpoint.memory import MemorySaver

# from tools import tool
from tools.database_state_legislator_tools import find_house_rep_by_district, find_senate_rep_by_district, find_house_rep_by_name, find_senate_rep_by_name
from tools.google_civic_tools import get_political_divisions_by_address

##### NEED THIS FOR LOCAL DEVELOPMENT #####
import os
from dotenv import load_dotenv
# Load environment variables from the .env file located in the parent directory
load_dotenv(dotenv_path='../.env')

llm = ChatOllama(
    model="llama3.1",
    base_url="http://localhost:11434" # Use the service name from docker-compose
)
##### NEED THIS FOR LOCAL DEVELOPMENT #####

# result=llm.invoke("Hello")
# print(result)

# List of tools for the agent
tools = [get_political_divisions_by_address, find_house_rep_by_district, find_senate_rep_by_district, find_house_rep_by_name, find_senate_rep_by_name]
llm_with_tools = llm.bind_tools(tools)

# --- 2. Agent Graph Definition ---

# Define the system prompt to guide the agent's reasoning
sys_msg = SystemMessage(
    content=(
        "You are a helpful assistant who helps users find their state representatives. "
        "Your goal is to use the tools provided to answer the user's request. "
        "If you need an address to use a tool and the user has not provided one, "
        "you MUST ask the user for their full address before doing anything else."
    )
)

# Define the agent's nodes
# Define the agent's nodes
def assistant_node(state: MessagesState):
    """Calls the LLM and includes a guard to validate its output."""
    # 1. Call the LLM
    response = llm_with_tools.invoke([sys_msg] + state["messages"])

    # 2. Guard: Check for hallucinated addresses
    if response.tool_calls:
        for tool_call in response.tool_calls:
            if tool_call['name'] == 'get_political_divisions_by_address':
                address_arg = tool_call['args'].get('address', '')
                # A simple heuristic: if the address has no numbers, it's probably not real.
                if not any(char.isdigit() for char in address_arg):
                    # Override the bad tool call with a clarifying question
                    new_content = "I can help with that, but I need a valid street address. What is your full address?"
                    new_response = AIMessage(content=new_content)
                    return {"messages": [new_response]}

    # If the guard passes, return the original response
    return {"messages": [response]}

# Create the graph
builder = StateGraph(MessagesState)
builder.add_node("assistant", assistant_node)
builder.add_node("tools", ToolNode(tools))

# Define the graph's edges (the control flow)
builder.add_edge(START, "assistant")
builder.add_conditional_edges("assistant", tools_condition) # Automatically routes to 'tools' or END
builder.add_edge("tools", "assistant") # After tools run, return to the assistant to process results

# Compile the graph
graph = builder.compile()

# --- 3. Run the Conversational Loop ---

# Start a new conversation thread
thread = {"configurable": {"thread_id": "1"}}

# 1. Add a checkpointer to save the conversation state
memory = MemorySaver()

# Compile the graph WITH the checkpointer
graph = builder.compile(checkpointer=memory)

# --- 3. Run the Conversational Loop (Corrected) ---

# Start a new conversation thread
thread = {"configurable": {"thread_id": "1"}}
print("--- Agent is ready. Ask a question or type 'quit' to exit. ---")

while True:
    user_input = input("\n> ")
    if user_input.lower() in ["quit", "exit"]:
        break
    
    # The input must be a dictionary matching the graph's state
    initial_input = {"messages": [HumanMessage(content=user_input)]}
    
    # Stream the agent's response
    events = graph.stream(initial_input, thread)
    for event in events:
        # Check for events from nodes that produce messages
        if "assistant" in event:
            event["assistant"]["messages"][-1].pretty_print()
        elif "tools" in event:
            # You can optionally print tool outputs for debugging
            # print("--- Tool Output ---")
            # event["tools"]["messages"][-1].pretty_print()
            pass # We'll skip printing tool messages for a cleaner UI