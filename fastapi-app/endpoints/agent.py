import json
import os
from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from langchain_ollama import ChatOllama
from langchain_core.messages import HumanMessage
from langgraph.prebuilt import create_react_agent

# Import your tools
from tools.database_state_legislator_tools import state_legislator_database_search
from tools.google_civic_tools import get_political_divisions_by_address

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
    state_legislator_database_search,
    get_political_divisions_by_address
]

# Create the agent executor
agent_executor = create_react_agent(model, tools=tools)

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