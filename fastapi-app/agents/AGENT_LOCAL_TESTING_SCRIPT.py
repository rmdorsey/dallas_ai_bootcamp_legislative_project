##### NOTE - this isn't being used in the FastAPI app, but is a standalone script for testing the agent functionality LOCALLY.

import os
from dotenv import load_dotenv
# from langchain.agents import AgentExecutor, create_react_agent
# from langchain_core.prompts import hub
from langchain_ollama import ChatOllama
from langchain_core.messages import HumanMessage
from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt import create_react_agent
# Import your newly created tool
from tools.database_state_legislator_tools import state_legislator_database_search
from tools.google_civic_tools import get_political_divisions_by_address

# Load environment variables from the .env file located in the parent directory
load_dotenv(dotenv_path='../.env')

model = ChatOllama(
    model="llama3.1",
    base_url="http://localhost:11434" # Use the service name from docker-compose
)

# The list of tools the agent can use
tools = [
    state_legislator_database_search,
    get_political_divisions_by_address
]

agent_executor = create_react_agent(model, tools=tools)

config = {"configurable": {"thread_id": "test"}}
for step in agent_executor.stream(
    {"messages": [HumanMessage(content="Can you find the capitol office address for Katrina Pierson in the house?")]},
    config,
    stream_mode="values",
):
    step["messages"][-1].pretty_print()

# # Pull a standard ReAct prompt
# prompt = hub.pull("hwchase17/react")

# # Create the agent
# agent = create_react_agent(llm, tools, prompt)
# agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

# # Example invocation
# response = agent_executor.invoke({
#     "input": "Can you find the capitol office address for Katrina Pierson in the house?"
# })

# print(response['output'])