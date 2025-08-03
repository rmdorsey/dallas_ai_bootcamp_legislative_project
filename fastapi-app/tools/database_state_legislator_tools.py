from langchain.tools import tool
import json
# Import your original database function
from services.database_state_legislators import query_legislator

@tool
def find_house_rep_by_district(district: int) -> str:
    """Finds a Texas state house representative by their district number.

    Use this tool to get detailed information about a specific representative when you know their district number. This is often used after finding a user's legislative district via their address.

    Args:
        district (int): The legislative district number for the Texas House of Representatives.

    Returns:
        str: A JSON string containing the legislator's full name, party, district, and other details, or an error message if no representative is found for that district.
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
    """Finds a Texas state senator by their district number.

    Use this tool to get detailed information about a specific state senator when you know their district number. This is often used after finding a user's legislative district via their address.

    Args:
        district (int): The legislative district number for the Texas Senate.

    Returns:
        str: A JSON string containing the senator's details (name, party, district, etc.), or an error message if no senator is found for that district.
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
    """Finds detailed information for a Texas state house representative given their full name.

    Use this tool when the user asks a question about a specific member of the Texas House of Representatives by their full name.

    Args:
        full_name (str): The full name of the house representative to search for. For example, 'John Doe'.

    Returns:
        str: A JSON string containing the representative's details, or an error message if a representative with that name is not found.
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
    """Finds detailed information for a Texas state senator given their full name.

    Use this tool when the user asks a question about a specific member of the Texas Senate by their full name.

    Args:
        full_name (str): The full name of the state senator to search for. For example, 'Jane Smith'.

    Returns:
        str: A JSON string containing the senator's details, or an error message if a senator with that name is not found.
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
