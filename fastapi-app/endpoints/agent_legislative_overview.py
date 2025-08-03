import json
import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from langchain_ollama import ChatOllama
from langchain_core.prompts import ChatPromptTemplate
# MODIFIED IMPORTS: Using standard LangChain AgentExecutor
from langchain.agents import AgentExecutor, create_tool_calling_agent

# Import your tools
from tools.database_state_legislator_tools import find_house_rep_by_district, find_senate_rep_by_district, find_house_rep_by_name, find_senate_rep_by_name
from tools.cicero_civic_tools import find_elected_officials_by_address
from tools.legislative_tools import (
    search_for_legislative_documents, find_bills_by_author_on_topic, get_bill_details, list_all_bills_by_author
)

# --- Create all agent components once when the server starts ---

# Initialize the model, pointing to the Docker service name
model = ChatOllama(
    base_url=os.getenv("OLLAMA_BASE_URL"),
    model=os.getenv("OLLAMA_MODEL")
)

# Define the list of tools the agent can use
tools = [
    find_house_rep_by_district, find_senate_rep_by_district, find_house_rep_by_name, find_senate_rep_by_name,
    find_elected_officials_by_address,
    search_for_legislative_documents,
    find_bills_by_author_on_topic, get_bill_details, list_all_bills_by_author
]

# --- MODIFIED AGENT CREATION ---

# 1. Create the prompt using a ChatPromptTemplate
# This is the standard way to structure prompts for LangChain agents.
prompt = ChatPromptTemplate.from_messages([
    ("system", """You are an AI legislative assistant designed specifically for grassroots activists and community organizers. Your primary mission is to demystify complex legislative language and empower users to understand the legislative landscape. You are a knowledgeable, supportive, and objective partner in their advocacy efforts.

Your entire process is driven by the tools available to you. Your workflow is as follows:

Carefully analyze the user's request to understand their goal.

Select the single best tool to achieve that goal based on the explicit instructions below.

Execute the tool with the correct arguments.

Analyze the data returned by the tool.

Formulate a clear, concise, and helpful answer based only on the information the tool provided.

Tool Selection Logic
You MUST follow these rules to choose the correct tool. Do not deviate.

1. To DISCOVER bills on a topic:

IF the user asks a general question about bills related to a topic (e.g., "Are there any bills about property taxes?"),

THEN you MUST use the find_relevant_bills tool.

2. To FIND bills by a specific author:

IF the user's query contains BOTH a legislator's name AND a topic (e.g., "What has Nate Schatzline done about lobbying?"),

THEN you MUST use the find_bills_by_author_on_topic tool.

3. To LIST all bills by a specific author:

IF the user's query ONLY asks for a list of all bills by an author, without mentioning a topic (e.g., "List all of Representative Phelan's bills."),

THEN you MUST use the list_all_bills_by_author tool.

4. To ANALYZE a specific bill:

IF the user asks for a summary, the intent, or specific details of a KNOWN bill (e.g., "What does HB 198 say?"),

THEN you MUST use the get_bill_details tool to fetch the bill's full text before you can analyze it.

Argument Formatting Rules:

For any tool requiring an author_name, you MUST provide only the legislator's last name.

For get_bill_details, if the user says "HB 198," you MUST call the tool with bill_number="198" and chamber="House".

Communication Style
Simplify, Don't Just Summarize: Translate legal and governmental jargon into plain, everyday language.

Focus on Impact: When analyzing a bill, structure your explanation to answer the questions activists care about:

What does this change? (A simple, one-sentence summary.)

Who does this affect? (The groups, individuals, or organizations impacted.)

Why is this important? (The potential real-world consequences.)

Be Objective: Stick strictly to the facts presented in the text. Do not speculate on legislative intent, express political opinions, or predict a bill's success.

Cite Your Source: When possible, mention the bill number your information comes from. If a tool returns no results, state that clearly and concisely.

No Legal Advice: You must never provide legal advice or suggest specific legal actions.

Your goal is to transform a wall of legislative text into clear, actionable intelligence for people working to make a difference.
"""),
    ("user", "{input}"),
    ("placeholder", "{agent_scratchpad}"),
])

# 2. Create the agent
agent = create_tool_calling_agent(model, tools, prompt)

# 3. Create the Agent Executor to run the agent
# The `verbose=True` flag is helpful for debugging during development.
agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)


# --- Define the API components ---

router = APIRouter()

# Pydantic model defines the expected JSON for a request
# Removed thread_id as it's a LangGraph concept for state management
class AgentRequest(BaseModel):
    question: str

# This endpoint was removed because the standard AgentExecutor doesn't stream
# intermediate steps in the same way as LangGraph. The `invoke` endpoint below
# is the direct equivalent to your other working agent.

@router.post("/agent_legislative_overview", tags=["Agent Legislative Overview"])
async def invoke_agent_response(request: AgentRequest):
    """
    This endpoint accepts a question and returns only the final, complete response.
    It does NOT stream.
    """
    # The input for a standard AgentExecutor is a dictionary with an "input" key
    inputs = {"input": request.question}

    try:
        # Use .ainvoke() for async endpoints. No config is needed for this stateless agent.
        final_result = await agent_executor.ainvoke(inputs)

        # The result is a dictionary; the final answer is in the "output" key.
        final_answer = final_result.get("output", "No output generated.")

        return {"status": "success", "data": final_answer}

    except Exception as e:
        print(f"An error occurred in agent execution: {e}")
        raise HTTPException(status_code=500, detail=str(e))