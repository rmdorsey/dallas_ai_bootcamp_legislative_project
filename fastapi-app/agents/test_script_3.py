from typing_extensions import TypedDict
from typing import Annotated
from langchain_ollama import ChatOllama

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

# result=llm.invoke("Hello")
# print(result)

def multiply(a: int, b: int) -> int:
    """Multiply a and b.

    Args:
        a: first int
        b: second int
    """
    return a * b

# This will be a tool
def add(a: int, b: int) -> int:
    """Adds a and b.

    Args:
        a: first int
        b: second int
    """
    return a + b

def divide(a: int, b: int) -> float:
    """Divide a by b.

    Args:
        a: first int
        b: second int
    """
    return a / b

tools = [add, multiply, divide]

llm_with_tools=llm.bind_tools(tools)


# from IPython.display import Image, display

# That line imports the MemorySaver class, which is a simple, built-in checkpointer for LangGraph that saves the state of a graph in your computer's RAM.
from langgraph.checkpoint.memory import MemorySaver
# a predefined dictionary structure that LangGraph uses to keep track of a conversation.
# The value is a list that holds a sequence of message objects (e.g., HumanMessage, AIMessage, ToolMessage)
from langgraph.graph import MessagesState
from langgraph.graph import START, StateGraph
# ToolNode is the component that executes a tool, and tools_condition is the component that decides whether a tool needs to be executed.
from langgraph.prebuilt import tools_condition, ToolNode

from langchain_core.messages import AIMessage, HumanMessage, SystemMessage

# System message
sys_msg = SystemMessage(content="You are a helpful assistant tasked with performing arithmetic on a set of inputs.")

# no-op node that should be interrupted on
def human_feedback(state: MessagesState):
    pass

# Assistant node
def assistant(state: MessagesState):
   # this includes a request to use the tools
   return {"messages": [llm_with_tools.invoke([sys_msg] + state["messages"])]}

# Graph
builder = StateGraph(MessagesState)

# Define nodes: these do the work
builder.add_node("assistant", assistant)
builder.add_node("tools", ToolNode(tools))
builder.add_node("human_feedback", human_feedback)

# Define edges: these determine the control flow
builder.add_edge(START, "human_feedback")
builder.add_edge("human_feedback", "assistant")
builder.add_conditional_edges(
    "assistant",
    # If the latest message (result) from assistant is a tool call -> tools_condition routes to tools
    # If the latest message (result) from assistant is a not a tool call -> tools_condition routes to END
    tools_condition,
)
builder.add_edge("tools", "human_feedback")

memory = MemorySaver()
graph = builder.compile(interrupt_before=["human_feedback"], checkpointer=memory)
# display(Image(graph.get_graph().draw_mermaid_png()))

# Input
initial_input = {"messages": "Multiply 5 and 3"}

# Thread
thread = {"configurable": {"thread_id": "3"}}

# Run the graph until the first interruption
for event in graph.stream(initial_input, thread, stream_mode="values"):
    event["messages"][-1].pretty_print()

## get user input
user_input=input("Tell me how you want to update the state:")

# 1. Get the current state of the graph for this thread
current_state = graph.get_state(thread)

# 2. Get the list of messages from the current state
messages = current_state.values["messages"]

# 3. Append your new input as a HumanMessage object
messages.append(HumanMessage(content=user_input))

# 4. Update the graph with the complete, modified list of messages
graph.update_state(thread, {"messages": messages}, as_node="human_feedback")

# Continue the graph execution
for event in graph.stream(None, thread, stream_mode="values"):
    event["messages"][-1].pretty_print()

# for event in graph.stream(None, thread, stream_mode="values"):
#     event["messages"][-1].pretty_print()