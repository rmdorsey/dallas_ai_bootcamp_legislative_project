from langchain.tools import tool
import json
# Import your original database function
from services.database_state_legislators import query_legislator

@tool
def find_house_rep_by_district(district: int) -> str:
    """
    Finds a Texas state house representative by their district number.
    Use this after you have found the user's lower-chamber legislative district
    from the get_political_divisions_by_address tool.
    """
    print(f"--- TOOL: Searching database for House Rep in district {district}... ---")
    
    # The arguments are now hardcoded for this specific task
    legislator_data = query_legislator(
        table_name="house_representatives", 
        column="district_number", 
        value=district
    )
    
    if legislator_data:
        # Return the data as a clean JSON string for the LLM to read
        return json.dumps(legislator_data, indent=2)
    
    return f"No House representative was found in the database for district {district}."


@tool
def find_senate_rep_by_district(district: int) -> str:
    """
    Finds a Texas state senator by their district number.
    Use this after you have found the user's upper-chamber legislative district
    from the get_political_divisions_by_address tool.
    """
    print(f"--- TOOL: Searching database for Senator in district {district}... ---")

    # The arguments are now hardcoded for this specific task
    legislator_data = query_legislator(
        table_name="senate_senators", 
        column="district_number", 
        value=district
    )
    
    if legislator_data:
        # Return the data as a clean JSON string for the LLM to read
        return json.dumps(legislator_data, indent=2)
        
    return f"No Senator was found in the database for district {district}."

@tool
def find_house_rep_by_name(full_name: str) -> str:
    """
    Finds detailed information for a Texas state house representative given their full name.
    Use this tool if the user asks a question about a specific representative by name.
    """
    print(f"--- TOOL: Searching database for House Rep with name '{full_name}'... ---")
    
    legislator_data = query_legislator(
        table_name="house_representatives",
        column="full_name",
        value=full_name
    )
    
    if legislator_data:
        return json.dumps(legislator_data, indent=2)
    return f"No House representative was found in the database with the name '{full_name}'."

@tool
def find_senate_rep_by_name(full_name: str) -> str:
    """
    Finds detailed information for a Texas state senator given their full name.
    Use this tool if the user asks a question about a specific senator by name.
    """
    print(f"--- TOOL: Searching database for Senator with name '{full_name}'... ---")
    
    legislator_data = query_legislator(
        table_name="senate_senators",
        column="full_name",
        value=full_name
    )
    
    if legislator_data:
        return json.dumps(legislator_data, indent=2)
    return f"No Senator was found in the database with the name '{full_name}'."

# @tool
# def state_legislator_database_search(chamber: str, column: str, value: str | int) -> str:
#     """
#     A tool to search the internal database for a specific state legislator in either the Texas House or Senate.
#     Use this to find detailed information like office addresses, phone numbers, or biography for a legislator
#     when you already know their full name or district number. You must provide the legislative chamber
#     ('house' or 'senate'), the search column ('full_name' or 'district_number'), and the value to search for.
#     """
#     # --- Input Validation and Mapping ---
#     chamber_lower = chamber.lower()
#     if chamber_lower not in ['house', 'senate']:
#         return "Error: Invalid chamber specified. Please use 'house' or 'senate'."
    
#     table_name = "house_representatives" if chamber_lower == "house" else "senate_senators"

#     # --- Call the original database function ---
#     print(f"Tool: Calling database to search for {value} in {table_name}...")
#     legislator_data = query_legislator(
#         table_name=table_name,
#         column=column,
#         value=value
#     )

#     # --- Format the output for the LLM ---
#     if legislator_data:
#         # Convert the dictionary to a nicely formatted JSON string
#         return json.dumps(legislator_data, indent=2)
#     else:
#         return f"No legislator was found in the {chamber} matching {column} = '{value}'."
