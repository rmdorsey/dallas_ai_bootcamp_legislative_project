# fastapi-app/tools/legislative_tools.py

import json
import re
from typing import Optional, List, Dict, Any
from langchain.tools import tool

# Import your service functions
from services.legislative_search_service import run_search_service
from services.legislative_query_service import run_query_service

# --- Tools Based on Semantic Search ---
@tool
def search_for_legislative_documents(query: str, chamber: Optional[str] = None) -> str:
    """
    Finds and ranks legislative bills based on a user's natural language description of a topic.

    This is the best tool to use when a user wants to discover bills related to a specific issue,
    policy, or concept. It is ideal for open-ended questions like "Are there any bills about..."
    or "Show me legislation related to...". The tool returns a list of bills, with the most
    relevant ones appearing first.

    The 'query' should be a clear, descriptive topic. High-quality examples include:
    - "legislation creating a criminal offense for real property theft and fraud"
    - "laws to stop someone from stealing a house with a fake or fraudulent deed"
    - "bills requiring photo identification for filing real property documents with the county clerk"
    - "legislation to create an Independent Citizen Redistricting Commission for Texas"
    - "proposals for a non-partisan or citizen-led process for drawing legislative district maps"
    - "how to prevent gerrymandering and partisan influence in Texas redistricting"
    - "independent commission for redistricting with conflict of interest rules for members and criteria for map drawing like population equality and compactness"
    - "legislation requiring outdoor warning sirens for flood-prone areas"
    - "laws to improve flood alert systems in Texas communities"
    - "grant program for municipalities to install flood sirens"
    - "outdoor warning siren installation maintenance operation flood-prone area grant program backup power"
    - "legislation restricting lobbying funds for MUDs, community colleges, and transit authorities"
    - "bills that cut off state funding for public entities that hire lobbyists"
    - "how to stop publicly owned utilities and universities from using tax money for lobbying"
    - "ban taxpayer-funded lobbying special purpose district regional mobility authority penalty state funds"

    You can optionally filter the search to a specific legislative chamber ('House' or 'Senate')
    if the user's request specifies it.

    Args:
        query (str): A detailed description of the topic or issue to find bills about.
        chamber (Optional[str]): The legislative chamber to filter by. Can be 'House' or 'Senate'.

    Returns:
        str: A JSON string representing a list of relevant bills. Each item in the list
        contains the bill number, chamber, a relevance score, and a snippet of the most
        relevant text found.
    """
    print(f"--- TOOL: Finding relevant bills for query: '{query}'... ---")
    
    # Call the underlying service function
    results = run_search_service(query=query, chamber=chamber)
    
    # Return the results as a JSON string for the agent to process
    return json.dumps(results, indent=2)


@tool
def find_bills_by_author_on_topic(author_name: str, topic: str) -> str:
    """
    Finds and ranks legislative bills on a specific topic that are authored by a specific legislator.

    Use this tool when the user's request includes both a topic and the name of a bill's author.
    This tool is highly specific and should only be used when both pieces of information are present.

    IMPORTANT: For the 'author_name' argument, you MUST provide only the legislator's last name.
    If the user provides a full name or a title, extract only the last name before calling the tool.

    Example Scenarios:
    - User asks: "Are there any bills by Nate Schatzline about tax-payer funded lobbying?"
      - Call with: author_name="Schatzline", topic="tax-payer funded lobbying"
    - User asks: "Please show me some bills about property tax relief authored by Mayes Middleton."
      - Call with: author_name="Middleton", topic="property tax relief"
    - User asks: "I want to see bills about congressional redistricting from Representative Phelan."
      - Call with: author_name="Phelan", topic="congressional redistricting"

    Args:
        author_name (str): The last name of the legislator who authored the bills.
        topic (str): A detailed description of the topic or issue to find bills about.

    Returns:
        str: A JSON string representing a list of relevant bills. Each item in the list
        contains the bill number, chamber, a relevance score, and a snippet of the most
        relevant text found.
    """
    print(f"--- TOOL: Finding bills by author '{author_name}' on topic: '{topic}'... ---")
    
    # Call the underlying service function, mapping the tool's parameters to the service's arguments
    results = run_search_service(query=topic, author=author_name)
    
    # Return the results as a JSON string for the agent to process
    return json.dumps(results, indent=2)


# --- Tools Based on Direct Metadata Query ---

@tool
def get_bill_details(bill_number: str, chamber: str) -> str:
    """
    Retrieves the full text for a specific bill to enable detailed analysis.

    Use this tool when a user asks for a summary, the intent, or specific details of a bill
    and you already know its number and chamber. This tool's purpose is to fetch all the raw
    text of the bill; the agent is then responsible for analyzing that text to answer the
    user's question (e.g., summarizing, finding intent, etc.).

    IMPORTANT: If the user includes 'HB' (House Bill) or 'SB' (Senate Bill) in their query,
    use only the number for the 'bill_number' argument and set the 'chamber' argument
    to 'House' or 'Senate' accordingly.

    Example Scenarios:
    - User asks: "What does HB 198 say?"
      - Call with: bill_number="198", chamber="House"
    - User asks: "Can you give me a summary of Senate Bill 45?"
      - Call with: bill_number="45", chamber="Senate"

    Args:
        bill_number (str): The number of the bill (e.g., '198').
        chamber (str): The legislative chamber of the bill ('House' or 'Senate').

    Returns:
        str: The complete, combined text of the specified legislative bill.
    """
    print(f"--- TOOL: Getting all details for {chamber} Bill {bill_number}... ---")

    # --- FIX IS HERE ---
    # Make the tool more resilient by cleaning the input from the agent.
    # This removes "HB", "SB", and any surrounding whitespace, leaving only the number.
    cleaned_bill_number = re.sub(r'(?i)HB|SB', '', bill_number).strip()
    print(f"--- Cleaned bill number to: '{cleaned_bill_number}' ---")


    filter_conditions = [{"chamber": {"$eq": chamber}}]

    # Use a robust filter to handle potential string vs. integer mismatches for the bill number.
    try:
        bill_num_int = int(cleaned_bill_number)
        filter_conditions.append({
            "$or": [
                {"bill_number": {"$eq": cleaned_bill_number}},
                {"bill_number": {"$eq": bill_num_int}}
            ]
        })
    except ValueError:
        # If the bill number is not a clean integer (e.g., 'HB-40'), filter by string only.
        filter_conditions.append({"bill_number": {"$eq": cleaned_bill_number}})

    filter_dict = {"$and": filter_conditions}
    
    results = run_query_service(filter_dict=filter_dict)

    if not results:
        return f"No documents found for {chamber} Bill {bill_number}."

    # Combine all the text chunks into a single string for the agent to analyze.
    full_text = "\n\n".join([doc.get("content", "") for doc in results])
    
    return full_text

@tool
def list_all_bills_by_author(author_name: str) -> str:
    """
    Retrieves a list of all legislative bills authored by a specific legislator.

    Use this tool when a user asks for a complete list of bills by a particular author.
    This tool is for listing bills, not for searching within them.

    IMPORTANT: For the 'author_name' argument, you MUST provide only the legislator's last name.
    If the user provides a full name or a title, extract only the last name.

    Example Scenarios:
    - User asks: "What bills has Representative Phelan authored?"
      - Call with: author_name="Phelan"
    - User asks: "List all of Nate Schatzline's bills."
      - Call with: author_name="Schatzline"

    Args:
        author_name (str): The last name of the legislator.

    Returns:
        str: A JSON string containing a list of all bills authored by the specified legislator.
        Each item includes the bill number, chamber, and title.
    """
    print(f"--- TOOL: Listing all bills for author '{author_name}'... ---")
    
    results = run_query_service(filter_dict={"author": author_name})

    if not results:
        return f"No bills found for author '{author_name}'."

    # Deduplicate the results to get a unique list of bills
    unique_bills = {}
    for doc in results:
        metadata = doc.get("metadata", {})
        bill_key = (metadata.get("bill_number"), metadata.get("chamber"))
        
        if bill_key not in unique_bills:
            unique_bills[bill_key] = {
                "bill_number": metadata.get("bill_number"),
                "chamber": metadata.get("chamber"),
                "title": metadata.get("title", "No title available")
            }
            
    return json.dumps(list(unique_bills.values()), indent=2)