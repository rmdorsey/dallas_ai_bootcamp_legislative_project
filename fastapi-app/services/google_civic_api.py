import requests
import os
from dotenv import load_dotenv

def get_divisions_by_address(address: str):
    """
    Queries the Google Civic Information API to find divisions by address.

    Args:
        address (str): The address to search for (e.g., "1600 Pennsylvania Ave NW, Washington, DC").

    Returns:
        A dictionary containing the API response, or None if an error occurs.
    """
    load_dotenv()

    api_key = os.getenv("GOOGLE_CIVIC_API_KEY")
    if not api_key:
        print("❌ Error: GOOGLE_CIVIC_API_KEY not found in .env file.")
        return None

    base_url = "https://www.googleapis.com/civicinfo/v2/divisionsByAddress"
    
    params = {
        "key": api_key,
        "address": address
    }

    try:
        print(f"Querying Google Civic API for address: '{address}'...")
        response = requests.get(base_url, params=params)

        # Raise an exception for bad status codes (4xx or 5xx)
        response.raise_for_status()

        print("✅ Successfully retrieved data from Google Civic API.")
        return response.json()

    except requests.exceptions.HTTPError as http_err:
        print(f"❌ HTTP error occurred: {http_err}")
        print(f"Response Body: {response.text}")
    except requests.exceptions.RequestException as req_err:
        print(f"❌ A request error occurred: {req_err}")
    except Exception as err:
        print(f"❌ An unexpected error occurred: {err}")
        
    return None

if __name__ == "__main__":
    # This is an example of how to run the function directly for testing.
    # Make sure to add your GOOGLE_CIVIC_API_KEY to your .env file first.
    
    # Example 1: A specific address
    test_address = "1600 Amphitheatre Parkway, Mountain View, CA"
    divisions_data = get_divisions_by_address(test_address)
    
    if divisions_data:
        print("\n--- Test Result ---")
        # Pretty-print the JSON response
        import json
        print(json.dumps(divisions_data, indent=2))
        print("-------------------")

    # Example 2: An address that might not exist
    print("\n--- Testing a bad address ---")
    bad_address_data = get_divisions_by_address("123 Fake Street, Nowhere")
    if not bad_address_data:
        print("Function correctly handled the bad address.")