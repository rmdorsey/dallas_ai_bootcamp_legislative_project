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
