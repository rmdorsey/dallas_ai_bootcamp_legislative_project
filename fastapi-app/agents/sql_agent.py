import os
from langchain_community.utilities import SQLDatabase
from langchain_ollama import ChatOllama # Using the new dedicated package
from langchain_community.agent_toolkits import create_sql_agent
from langchain.tools import Tool

# --- 1. Establish Database Connection ---
# LangChain's SQLDatabase utility connects to your DB and can inspect its schema.
# It uses the DATABASE_URL from your environment variables.
# We explicitly tell it which tables the agent is allowed to interact with.
db = SQLDatabase.from_uri(
    os.getenv("DATABASE_URL"),
    include_tables=['house_representatives', 'senate_senators'],
    sample_rows_in_table_info=2 # Fetches 2 sample rows to give the LLM context on the data format.
)

# --- 2. Define the LLM for the SQL Agent ---
# MODIFIED: Explicitly set the base_url to the Docker service name.
llm = ChatOllama(
    model="llama3", 
    temperature=0,
    base_url="http://ollama:11434"
)

# --- 3. Create the Specialist SQL Agent ---
# This is the magic step. `create_sql_agent` bundles the LLM with a toolkit
# that knows how to list tables, inspect schemas, and execute queries.
# The agent will reason about which of those actions to take.
# Setting verbose=True is great for debugging so you can see the agent's thoughts.
sql_agent_executor = create_sql_agent(
    llm=llm,
    db=db,
    agent_type="openai-tools", # A robust agent type that works well with many models
    verbose=True,
    handle_parsing_errors=True # Helps the agent recover from malformed SQL
)

# --- 4. Wrap the Agent in a LangGraph Tool ---
# This is the final, crucial step. We package the powerful agent executor
# into a simple tool that our main LangGraph agent can use.
# The 'description' is VERY important - it's how the main agent knows WHEN to use this tool.
sql_database_tool = Tool(
    name="legislator_sql_database_tool",
    func=sql_agent_executor.invoke,
    description="""
    Use this tool to answer factual questions about Texas state legislators,
    including their district numbers, names, office phone numbers, and other contact information.
    The input to this tool should be a complete, natural-language question.
    For example: 'Who represents district 33?' or 'What is Katrina Pierson's phone number?'
    """
)

# Example of how to run it for direct testing of this file
if __name__ == '__main__':
    print("--- Directly testing the SQL Agent Tool ---")
    
    # Test case 1
    question1 = "Which house district does Jeff Leach represent?"
    print(f"\n[Test Case 1] Question: {question1}")
    response1 = sql_database_tool.invoke({"input": question1})
    print(f"Response: {response1}")

    # Test case 2
    question2 = "What is state representative Katrina Pierson's capitol office phone number?"
    print(f"\n[Test Case 2] Question: {question2}")
    response2 = sql_database_tool.invoke({"input": question2})
    print(f"Response: {response2}")
