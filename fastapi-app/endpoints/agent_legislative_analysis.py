# main.py
import os
from dotenv import load_dotenv
from fastapi import FastAPI, APIRouter, HTTPException
from pydantic import BaseModel
from langchain_ollama import ChatOllama
from langchain.agents import AgentExecutor, create_tool_calling_agent
from langchain_core.prompts import ChatPromptTemplate

# Import your custom tools
from tools.legislative_bill_analyzer import LegislativeAnalysisTools

# Load environment variables from .env file
load_dotenv()

# --- Pydantic Models for Request and Response ---
class AgentRequest(BaseModel):
    bill_number: str
    chamber: str
    query: str

class AgentResponse(BaseModel):
    input: str
    output: str
    intermediate_steps: list

# --- APIRouter Setup ---
# Using a router helps organize endpoints in larger applications
router = APIRouter()

@router.post("/agent_legislative_analysis", response_model=AgentResponse)
async def run_agent(request: AgentRequest):
    """
    Runs the legislative analysis agent on a specific bill and query.
    
    This endpoint initializes the agent with the provided bill number and chamber,
    then executes the user's query to find and analyze relevant text.
    """
    try:
        print(f"Received request for bill: {request.bill_number}, query: {request.query}")

        # 1. Initialize the LLM from environment variables
        llm = ChatOllama(
            base_url=os.getenv("OLLAMA_BASE_URL"),
            model=os.getenv("OLLAMA_MODEL")
        )

        # 2. Instantiate the tools with the specific bill context from the request
        # Instantiate the tool class with the required state.
        search_tool = LegislativeAnalysisTools(
            bill_number=request.bill_number,
            chamber=request.chamber
        )
        tools = [search_tool]

        # 3. Create the agent prompt
        prompt = ChatPromptTemplate.from_messages([
            ("system", """You are an AI assistant designed specifically for grassroots activists and community organizers. Your primary mission is to demystify complex legislative language and empower users to understand how a bill could impact their community. You are a knowledgeable, supportive partner in their advocacy efforts.

        **Your Core Workflow:**
        1. When a user asks a question, your **first and only action** is to use the `search_legislative_text` tool to find the most relevant sections within the bill.
        2. Your final answer to the user **MUST** be based exclusively on the information returned by the tool.
        3. If the tool returns no relevant information, clearly state that the answer could not be found within the provided text.

        **How to Communicate:**
        * **Simplify, Don't Just Summarize:** Translate legal and governmental jargon into plain, everyday language. For example, instead of "ad valorem tax," explain it as "property tax." Instead of "notwithstanding any other provision of law," say "this rule overrides any other conflicting rules."
        * **Focus on Impact:** Structure your explanations to answer the questions activists care about most:
            * **What does this change?** (Start with a simple, one-sentence summary of the core action.)
            * **Who does this affect?** (Clearly identify the groups, individuals, or organizations impacted by this section.)
            * **Why is this important?** (Explain the potential real-world consequences of the change, both intended and potential.)
        * **Use Clear Formatting:** Use bullet points, bold text for key terms, and short paragraphs to make your answers easy to scan and digest.

        **Crucial Guardrails:**
        * **No Political Opinions:** Do not express personal or political opinions, or predict a bill's success.
        * **Cite Your Source:** When possible, mention which section or article your information comes from, as found in the tool's metadata. This helps users reference the source text themselves.

        Your goal is to transform a wall of legal text into clear, actionable intelligence for people working to make a difference."""),
            ("user", "{input}"),
            ("placeholder", "{agent_scratchpad}"),
        ])
        
        # 4. Create the agent
        agent = create_tool_calling_agent(llm, tools, prompt)

        # 5. Create the Agent Executor to run the agent
        agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

        # 6. Invoke the agent and get the result
        response = agent_executor.invoke({
            "input": request.query
        })
        
        return AgentResponse(
            input=response.get("input", ""),
            output=response.get("output", "No output generated."),
            intermediate_steps=response.get("intermediate_steps", [])
        )

    except Exception as e:
        print(f"An error occurred: {e}")
        raise HTTPException(status_code=500, detail=str(e))