import json
import os
from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from langchain_ollama import ChatOllama
from langchain_core.messages import HumanMessage
from langgraph.prebuilt import create_react_agent

# Import your tools
from tools.database_state_legislator_tools import find_house_rep_by_district, find_senate_rep_by_district, find_house_rep_by_name, find_senate_rep_by_name
from tools.google_civic_tools import get_political_divisions_by_address
from tools.legislative_tools import (
    search_for_legislative_documents, find_bills_by_author_on_topic, get_bill_details, list_all_bills_by_author
)
# --- Create all agent components once when the server starts ---
# This is efficient as they are not recreated on every API call.

# Initialize the model, pointing to the Docker service name
model = ChatOllama(
    # Read from environment variables, with a fallback default
    base_url=os.getenv("OLLAMA_BASE_URL"),
    model=os.getenv("OLLAMA_MODEL")
)

# Define the list of tools the agent can use
tools = [
    find_house_rep_by_district, find_senate_rep_by_district, find_house_rep_by_name, find_senate_rep_by_name,
    get_political_divisions_by_address,
    search_for_legislative_documents,
    find_bills_by_author_on_topic, get_bill_details, list_all_bills_by_author
]

# ==================== NEW: Custom System Prompt ====================
# This prompt gives the agent strict instructions on how to format its final output.
system_prompt = """You are a helpful assistant to grassroots political activists.

You have access to a variety of tools to look up information about legislation, legislators, political platforms, and political processes.

When you receive a result from a tool, you MUST follow these rules:
1.  Be very concise and only return the most relevant information.
2.  If the user requests a list of anything, return a simple list.
3.  Give structured responses such as lists or dictionaries when appropriate.
4.  If the tool returns an empty result or an error, simply respond that you don't have enough information to answer their question.
"""
# ===================================================================


# Create the agent executor
agent_executor = create_react_agent(model, tools=tools, system_prompt=system_prompt)

# --- Define the API components ---

# This creates a new "router" for our agent endpoints
router = APIRouter()

# This Pydantic model defines the expected JSON format for a request
class AgentRequest(BaseModel):
    question: str
    thread_id: str = "default-thread-id" # Use a default or allow client to specify

# This is the main async function that generates the streaming response
async def stream_generator(question: str, thread_id: str):
    """
    This is a generator function that yields events from the agent stream.
    """
    # The config is necessary to keep the conversation state
    config = {"configurable": {"thread_id": thread_id}}
    
    # The input to the agent is a dictionary with a "messages" key
    inputs = {"messages": [HumanMessage(content=question)]}

    try:
        # Stream the agent's response
        for chunk in agent_executor.stream(inputs, config, stream_mode="values"):
            # The chunk contains the latest messages. We extract and format it.
            # You can customize what data you want to send.
            # Here, we'll send the pretty-printed version of the last message.
            last_message = chunk["messages"][-1]
            
            # Format as a Server-Sent Event (SSE)
            # The client will receive this as a JSON object
            data_to_send = {
                "type": last_message.type,
                "content": str(last_message.content),
                # Safely get tool_calls, defaulting to None if the attribute doesn't exist
                "tool_calls": getattr(last_message, 'tool_calls', None)
            }
            yield f"data: {json.dumps(data_to_send)}\n\n"

    except Exception as e:
        # If an error occurs, send an error event
        error_data = {"type": "error", "content": str(e)}
        yield f"data: {json.dumps(error_data)}\n\n"


@router.post("/stream", tags=["Agent"])
async def stream_agent_response(request: AgentRequest):
    """
    This endpoint accepts a question and streams the agent's response back.
    """
    return StreamingResponse(
        stream_generator(request.question, request.thread_id), 
        media_type="text/event-stream"
    )