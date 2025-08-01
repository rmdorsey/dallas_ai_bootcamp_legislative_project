from langchain.tools import tool
import json
# Import the service function that calls the Google Civic API
from services.google_civic_api import get_divisions_by_address

@tool
def get_political_divisions_by_address(address: str) -> str:
    """
    Queries the Google Civic Information API to find divisions by address.

    Args:
        address (str): The address to search for (e.g., "1600 Pennsylvania Ave NW, Washington, DC").

    Returns:
        A dictionary containing the API response, or None if an error occurs.
    """
    # """
    # Use this tool to find all the political and administrative divisions for a given street address.
    # It returns a list of all relevant districts, such as congressional, state senate, state house, county, and city.
    # The input must be a single string containing a full street address.
    # """
    if not address or not isinstance(address, str):
        return "Error: A valid street address string must be provided."

    print(f"Tool: Calling Google Civic API to get divisions for address: '{address}'")
    divisions_data = get_divisions_by_address(address)

    if divisions_data and "divisions" in divisions_data:
        # We only need to return the 'divisions' part to the LLM
        return json.dumps(divisions_data['divisions'], indent=2)
    elif divisions_data and "error" in divisions_data:
        # The API might return a structured error
        error_info = divisions_data['error'].get('message', 'An unknown error occurred.')
        return f"Error from Google Civic API: {error_info}"
    else:
        return f"Could not find any political divisions for the address: '{address}'. The address might be invalid or incomplete."