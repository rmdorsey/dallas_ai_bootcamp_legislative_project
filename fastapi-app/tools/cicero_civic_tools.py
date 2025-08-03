import json
from langchain.tools import tool
# Assuming your service function is in a file like this
from services.cicero_data_api import get_representative_by_address

@tool
def find_elected_officials_by_address(address: str, district_type: str) -> str:
    """
    Finds the elected officials for a specific address and legislative district level using the Cicero Data API.

    This is the primary tool to use when a user asks "Who represents me?", "Find my state senator", or any question asking to identify an elected official for a given location. The tool requires a full, specific street address for accuracy.

    The 'district_type' argument is crucial for targeting the correct level of government. You MUST use one of the following exact string values:
    - 'STATE_LOWER': For the State House of Representatives or State Assembly.
    - 'STATE_UPPER': For the State Senate.
    - 'NATIONAL_LOWER': For the U.S. House of Representatives (Congresspersons).
    - 'NATIONAL_UPPER': For U.S. Senators.

    Example Scenarios:
    - User asks: "Who is my state representative at 301 Trail View Ln, Garland, TX 75043?"
      - Call with: address="301 Trail View Ln, Garland, TX 75043", district_type="STATE_LOWER"
    - User asks: "I live at 601 W Renner Rd, Richardson, TX 75080. Who is my U.S. Congressperson?"
      - Call with: address="601 W Renner Rd, Richardson, TX 75080", district_type="NATIONAL_LOWER"

    Args:
        address (str): The full street address to search, including city, state, and zip code.
        district_type (str): The type of legislative district to find. Must be one of 'STATE_LOWER', 'STATE_UPPER', 'NATIONAL_LOWER', or 'NATIONAL_UPPER'.

    Returns:
        str: A JSON string containing the detailed API response from the Cicero Data API. This response includes official names, party, contact information, and district details. If no official is found, it will indicate that.
    """
    print(f"--- TOOL: Finding official for address '{address}' and district type '{district_type}'... ---")
    response_data = get_representative_by_address(address, district_type)
    
    if response_data:
        return json.dumps(response_data, indent=2)
    
    return "Could not retrieve information for the specified address and district type."