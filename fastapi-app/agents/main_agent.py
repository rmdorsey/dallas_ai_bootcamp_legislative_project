import os
from typing import TypedDict, Annotated, Sequence
from langchain_core.messages import BaseMessage, HumanMessage
from langchain_ollama import ChatOllama # Using the new dedicated package
from langgraph.graph import StateGraph, END
from langgraph.prebuilt import ToolNode

# --- Import your tools ---
# The specialist SQL agent tool you created
from .sql_agent import sql_database_tool 
# A placeholder for your RAG tool
from services.rag_retriever import rag_retriever_tool

# This is the state of our graph. It's a list of messages that will be passed between nodes.
class AgentState(TypedDict):
    messages: Annotated[Sequence[BaseMessage], lambda x, y: x + y]

class MainAgent:
    """
    This class defines the main agentic workflow using LangGraph.
    It acts as a supervisor, routing tasks to specialized tools like a SQL agent or a RAG retriever.
    """

    def __init__(self):
        # --- 1. Define the Tools ---
        # A list of all tools the main agent can choose from.
        self.tools = [sql_database_tool, rag_retriever_tool]
        
        # --- 2. Define the Agent's "Brain" (the LLM) ---
        # MODIFIED: Explicitly set the base_url to the Docker service name.
        self.llm = ChatOllama(
            model="llama3.1", 
            temperature=0,
            base_url="http://ollama:11434"
        )

        # --- 3. Define the Graph ---
        self.graph = self._build_graph()

    def _build_graph(self):
        """
        Builds the LangGraph workflow using a ToolNode.
        """
        graph = StateGraph(AgentState)

        tool_node = ToolNode(self.tools)

        # --- Define the Nodes ---
        graph.add_node("agent", self.call_model)
        graph.add_node("action", tool_node)

        # --- Define the Edges ---
        graph.set_entry_point("agent")
        graph.add_conditional_edges(
            "agent",
            self.should_continue,
            {
                "continue": "action",
                "end": END,
            },
        )
        graph.add_edge("action", "agent")
        return graph.compile()

    def call_model(self, state: AgentState):
        """
        The primary node that calls the LLM. The LLM decides whether to
        use a tool or respond directly to the user.
        """
        model_with_tools = self.llm.bind_tools(self.tools)
        
        messages = state["messages"]
        response = model_with_tools.invoke(messages)
        return {"messages": [response]}

    def should_continue(self, state: AgentState):
        """
        This is a conditional edge. It checks the last message from the agent.
        """
        last_message = state["messages"][-1]
        if not last_message.tool_calls:
            return "end"
        return "continue"

    def get_executor(self):
        """
        Returns the compiled graph executor.
        """
        return self.graph

# --- Singleton instance ---
main_agent_instance = MainAgent()

def get_agent_executor():
    """
    A helper function to get the compiled agent executor.
    """
    return main_agent_instance.get_executor()

# Example of how to run it (for testing)
if __name__ == "__main__":
    agent_executor = get_agent_executor()

    # --- Test Case 1: SQL Tool ---
    print("--- Testing SQL Tool ---")
    response = agent_executor.invoke({
        "messages": [HumanMessage(content="Which house district does Jeff Leach represent?")]
    })
    print(response['messages'][-1].content)
    
    # --- Test Case 2: RAG Tool ---
    print("\n--- Testing RAG Tool ---")
    response = agent_executor.invoke({
        "messages": [HumanMessage(content="What is the process for a bill to become law?")]
    })
    print(response['messages'][-1].content)
