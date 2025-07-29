from fastapi import APIRouter, HTTPException, Query
from enum import Enum
# Assuming your database file is in a parent directory, you might use '..'
# Adjust the import path based on your project structure.
from services.database_state_legislators import query_legislator, get_all_legislators_from_chamber

router = APIRouter()

# Use an Enum for validated, case-insensitive chamber choices
class Chamber(str, Enum):
    house = "house"
    senate = "senate"

# Use an Enum for validated column choices
class SearchableColumn(str, Enum):
    district_number = "district_number"
    full_name = "full_name"

@router.get("/search", summary="Search for a specific legislator")
async def search_for_legislator(
    chamber: Chamber,
    column: SearchableColumn,
    value: str | int = Query(..., description="The value to search for (e.g., '33' or 'Jane Smith')")
):
    """
    Search for a single legislator in a specific chamber by a given column and value.
    """
    table_name = "house_representatives" if chamber == Chamber.house else "senate_senators"
    
    # --- DEBUG PRINT ---
    print(f"✅ API Endpoint: Searching in table '{table_name}' for {column.value} = '{value}'")

    legislator = query_legislator(table_name=table_name, column=column.value, value=value)
    
    # --- DEBUG PRINT ---
    print(f"✅ API Endpoint: Database returned: {legislator}")

    if not legislator:
        raise HTTPException(
            status_code=404, 
            detail=f"No legislator found in '{chamber.value}' where {column.value} = '{value}'"
        )
    return legislator

@router.get("/{chamber}", summary="List all legislators in a chamber")
async def list_legislators_by_chamber(chamber: Chamber):
    """
    Retrieve a list of all legislators from a specified chamber (house or senate).
    """
    table_name = "house_representatives" if chamber == Chamber.house else "senate_senators"
    
    legislators = get_all_legislators_from_chamber(table_name=table_name)
    
    return {"chamber": chamber, "count": len(legislators), "legislators": legislators}