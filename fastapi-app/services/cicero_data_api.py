import requests
import os
from dotenv import load_dotenv

def get_representative_by_address(address: str, district_type: str):
    # """
    # Queries the Cicero Data Civic Information API to find elected official information for a user's address.

    # Args:
    #     address (str): The address to search for (e.g., "301 Trail View Ln, Garland, TX 75043").

    # Returns:
    #     A dictionary containing the API response, or None if an error occurs.
    # """
    load_dotenv()

    api_key = os.getenv("CICERO_DATA_API_KEY")
    if not api_key:
        print("❌ Error: CICERO_DATA_API_KEY not found in .env file.")
        return None

    # end url example: https://app.cicerodata.com/v3.1/official?search_loc=601 W Renner Rd. Richardson, TX 75080&district_type=STATE_LOWER 
    base_url = "https://app.cicerodata.com/v3.1/official?"
    
    params = {
        "key": api_key,
        "search_loc": address,
        "district_type": district_type
    }

    try:
        print(f"Querying Google Civic API for address: '{address}'...")
        response = requests.get(base_url, params=params)

        # Raise an exception for bad status codes (4xx or 5xx)
        response.raise_for_status()

        print("✅ Successfully retrieved data from Cicero Civic API.")
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
    # empty main function for testing purposes
    pass
