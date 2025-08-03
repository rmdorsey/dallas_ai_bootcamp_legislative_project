# fastapi-app/tools/legislative_tools.py

import json
from typing import Optional, List, Dict, Any
from langchain.tools import tool

# Import your service functions
from services.legislative_search_service import run_search_service
from services.legislative_query_service import run_query_service

# --- Tools Based on Semantic Search ---

@tool
def search_for_legislative_documents(query: str, chamber: Optional[str] = None) -> str:
    """Searches for and retrieves relevant legislative documents based on a user's topic.

    Use this tool to find specific bills and their content when a user asks a question about a particular subject. The tool returns the most relevant text snippets from matching bills.

    Args:
        query (str): The topic or question to search for within the documents.
        chamber (Optional[str]): The legislative chamber to filter by ('House' or 'Senate').

    Returns:
        str: A list of relevant legislative bill documents. Use the information in these documents to formulate a direct and helpful summary that answers the user's original question. Do not describe the data structure or format in your answer.
    """
    print(f"--- TOOL: Searching for legislative documents with query: '{query}' ---")

    # 1. Call your existing service to get the full, detailed results.
    # We can hardcode 'k' to a reasonable number for tool use.
    full_results = run_search_service(query=query, chamber=chamber, k=25)
    print(f"*****Found {len(full_results)} documents matching the query.")
    # 2. Process the results to create a new list with only the desired fields.
    formatted_results = []
    for result in full_results:
        metadata = result.get("metadata", {})
        
        # Create a new dictionary with only the keys you want
        formatted_doc = {
            "chamber": metadata.get("chamber"),
            "bill_number": metadata.get("bill_number"),
            "author": metadata.get("author"),
            "source": metadata.get("source"),
            "content": result.get("content")
        }
        formatted_results.append(formatted_doc)
        # print(f"--- TOOL: Found document: {formatted_doc['bill_number']} in {formatted_doc['chamber']} by {formatted_doc['author']} with content: {formatted_doc['content']} at source: {formatted_doc['source']} ---")
    # 3. Return the clean list as a JSON string for the agent to use.
    return json.dumps(formatted_results, indent=2)

@tool
def find_bills_by_author_on_topic(author_name: str, topic: str) -> str:
    """Finds bills sponsored by a specific author that are related to a certain topic.

    Use this tool when a user's query combines an author and a topic, for example, 'what has Jane Smith sponsored regarding healthcare?'

    If the user uses the full name this tool should only use the last name for the function argument.
    example: 'Are there any bills about tax-payer funded lobbying by Nate Schatzline?"  Just use 'Schatzline' as the author_name.

    Args:
        author_name (str): The last name of the legislator.
        topic (str): The subject or topic to search for within the author's bills.

    Returns:
        str: A JSON string containing a ranked list of relevant bills sponsored by that author.
    """
    print(f"--- TOOL: Searching for bills by '{author_name}' on topic '{topic}'... ---")
    results = run_search_service(query=topic, author=author_name)
    return json.dumps(results, indent=2)


# --- Tools Based on Direct Metadata Query ---

@tool
def get_bill_details(bill_number: str, chamber: str) -> str:
    """Retrieves the full text for a specific bill given its number and chamber.

    Use this tool when you need to read, analyze, or summarize a specific bill and you already know its identifier (e.g., 'House Bill 198'). Do not use this for searching topics.

    If the user includes HB or SB in the bill number, just use the number without the prefix.
    Example: 'What does HB 198 say?' Just use '198' as the bill_number.

    HB should be used for House Bills and SB for Senate Bills.

    Args:
        bill_number (str): The number of the bill (e.g., '198').
        chamber (str): The legislative chamber of the bill ('House' or 'Senate').

    Returns:
        str: A JSON string containing a list of all text chunks for the specified bill.
    """
    print(f"--- TOOL: Getting all details for {chamber} Bill {bill_number}... ---")

    filter_dict = {"$and": [{"bill_number": int(bill_number)}, {"chamber": chamber}]}
    results = run_query_service(filter_dict=filter_dict)
    return json.dumps(results, indent=2)

@tool
def list_all_bills_by_author(author_name: str) -> str:
    """Lists the titles and numbers of all bills sponsored by a specific legislator.

    Use this tool when a user asks to see all the legislation authored by a particular legislator. Return the full list of bills.

    If the user uses the full name this tool should only use the last name for the function argument.
    example: 'Give me legislation authored by Nate Schatzline."  Just use 'Schatzline' as the author_name.

    Args:
        author_name (str): The last name of the legislator.

    Returns:
        str: A JSON string containing a list of all bill numbers and information for that author. Do not describe the data structure or format in your answer. Do not say things like "Based on the tool call response".
    """
    print(f"--- TOOL: Listing all bills by author '{author_name}'... ---")
    filter_dict = {"author": author_name}
    full_results = run_query_service(filter_dict=filter_dict)

    # Process the results to return only a summary list, as promised in the docstring.
    summary_list = []
    seen_bills = set()
    for doc in full_results:
        content = doc.get("content")
        metadata = doc.get("metadata", {})
        bill_num = metadata.get("bill_number")
        chamber = metadata.get("chamber")
        
        if bill_num and chamber and (bill_num, chamber) not in seen_bills:
            summary_list.append({
                "bill_number": bill_num,
                "chamber": chamber,
                "content": content
            })
            seen_bills.add((bill_num, chamber))
            
    return json.dumps(summary_list, indent=2)