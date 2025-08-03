from fastapi import FastAPI, APIRouter, Body, HTTPException
from typing import Dict, Any, Optional

# Import your service functions and the database connector
try:
    from services.legislative_query_service import run_query_service
    from services.legislative_search_service import run_search_service
    # from services.db_connector import get_vectorstore
except ImportError:
    # This try/except block makes the file runnable on its own for testing
    # In production, you'd ensure the path is correct.
    print("Could not import service files. Please check your project structure.")
    # Define dummy functions if imports fail, so the file can be loaded.
    def run_query_service(filter_dict): return []
    def run_search_service(**kwargs): return []
    # def get_vectorstore(): return None

# ================================================================
# PRE-INITIALIZATION ON STARTUP
# This should ideally be in your main application file, but it's
# fine here as well. It will run when this module is first imported.
# ================================================================
# print("API router loading... Pre-initializing vector store.")
# get_vectorstore() 
# print("Pre-initialization complete. API is ready.")

# ================================================================
# API ROUTER DEFINITION
# ================================================================
router = APIRouter()

@router.get("/search", summary="Perform a semantic search for legislation")
def search_endpoint(
    q: str,
    author: Optional[str] = None,
    bill_number: Optional[str] = None,
    chamber: Optional[str] = None,
    k: int = 50
):
    """
    Performs a semantic search on legislative documents.

    - **q**: The text query to search for.
    - **author**: (Optional) Filter results by a specific author.
    - **bill_number**: (Optional) Filter results by a specific bill number.
    - **chamber**: (Optional) Filter results by chamber ('House' or 'Senate').
    - **k**: (Optional) The maximum number of raw documents to retrieve for processing.
    """
    try:
        # Pass all parameters to the service function
        results = run_search_service(
            query=q, 
            author=author, 
            bill_number=bill_number, 
            chamber=chamber,
            k=k
        )
        return {"status": "success", "data": results}
    except Exception as e:
        # Gracefully handle any unexpected errors from the service layer
        print(f"An error occurred in /search: {e}")
        raise HTTPException(status_code=500, detail="An internal error occurred during search.")

@router.post("/get", summary="Get all documents matching a metadata filter")
def get_endpoint(filter_dict: Dict[str, Any] = Body(
    ...,
    example={
        "$or": [
            {"chamber": "House", "author": "Rep. Smith, John [R-TX-1]"},
            {"bill_number": "S.500"}
        ]
    }
)):
    """
    Retrieves all document chunks that exactly match a given metadata filter.
    This endpoint uses the ChromaDB filter specification.
    """
    try:
        results = run_query_service(filter_dict)
        return {"status": "success", "count": len(results), "data": results}
    except Exception as e:
        print(f"An error occurred in /get: {e}")
        raise HTTPException(status_code=500, detail="An internal error occurred during data retrieval.")