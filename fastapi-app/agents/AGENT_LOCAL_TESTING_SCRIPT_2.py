from typing_extensions import TypedDict
from typing import Annotated
from langgraph.graph.message import add_messages
from langchain_ollama import ChatOllama
from langgraph.graph import StateGraph
from langgraph.prebuilt import ToolNode, tools_condition
# from tools import tool
from tools.database_state_legislator_tools import state_legislator_database_search
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

class State(TypedDict):
    messages: Annotated[list, add_messages]

# The list of tools the agent can use
tools = [
    state_legislator_database_search,
    get_political_divisions_by_address
]

llm_with_tools = llm.bind_tools(tools)

def chatbot(state: State):
    msg = llm_with_tools.invoke(state["messages"])
    return {"messages": [msg]}

graph_builder = StateGraph(State)

# Add Chatbot Node Graph and set Entrypoint
graph_builder.add_node("chatbot", chatbot)
tool_node = ToolNode(tools)
graph_builder.add_node("tools", tool_node)

graph_builder.add_conditional_edges(
    "chatbot",
    tools_condition,
)
# Any time a tool is called, we return to the chatbot to decide the next step
graph_builder.add_edge("tools", "chatbot")
graph_builder.set_entry_point("chatbot")
graph = graph_builder.compile()

def stream_graph_updates(user_input: str):
    for event in graph.stream({"messages": [{"role": "user", "content": user_input}]}):
        for value in event.values():
            print("Assistant:", value["messages"][-1].content)

while True:
    try:
        user_input = input("User: ")
        if user_input.lower() in ["quit", "exit", "q"]:
            print("Goodbye!")
            break

        stream_graph_updates(user_input)
    except:
        # fallback if input() is not available
        user_input = "What do you know about LangGraph?"
        print("User: " + user_input)
        stream_graph_updates(user_input)
        break