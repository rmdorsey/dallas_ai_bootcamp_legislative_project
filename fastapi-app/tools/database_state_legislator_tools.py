from langchain.tools import tool
import json
# Import your original database function
from services.database_state_legislators import query_legislator

@tool
def state_legislator_database_search(chamber: str, column: str, value: str | int) -> str:
    """
    A tool to search the internal database for a specific state legislator in either the Texas House or Senate.
    Use this to find detailed information like office addresses, phone numbers, or biography for a legislator
    when you already know their full name or district number. You must provide the legislative chamber
    ('house' or 'senate'), the search column ('full_name' or 'district_number'), and the value to search for.
    """
    # --- Input Validation and Mapping ---
    chamber_lower = chamber.lower()
    if chamber_lower not in ['house', 'senate']:
        return "Error: Invalid chamber specified. Please use 'house' or 'senate'."
    
    table_name = "house_representatives" if chamber_lower == "house" else "senate_senators"

    # --- Call the original database function ---
    print(f"Tool: Calling database to search for {value} in {table_name}...")
    legislator_data = query_legislator(
        table_name=table_name,
        column=column,
        value=value
    )

    # --- Format the output for the LLM ---
    if legislator_data:
        # Convert the dictionary to a nicely formatted JSON string
        return json.dumps(legislator_data, indent=2)
    else:
        return f"No legislator was found in the {chamber} matching {column} = '{value}'."
