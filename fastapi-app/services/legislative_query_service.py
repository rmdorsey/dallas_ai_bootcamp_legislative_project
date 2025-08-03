import os
from dotenv import load_dotenv
from typing import List, Dict, Any
from langchain_huggingface import HuggingFaceEmbeddings
import chromadb
from langchain_chroma import Chroma

_vectorstore_instance = None

def get_vectorstore():
    global _vectorstore_instance
    if _vectorstore_instance is None:
        print("Initializing vector store from Query Service...")
        load_dotenv()
        embedding_model_name = os.environ.get('LEGISLATIVE_EMBEDDING_MODEL_NAME')
        collection_name = os.environ.get('LEGISLATIVE_CHROMA_COLLECTION_NAME')
        chroma_host = os.environ.get('CHROMA_SERVER_HOST')
        chroma_port = int(os.environ.get('CHROMA_SERVER_PORT'))
        
        embeddings = HuggingFaceEmbeddings(model_name=embedding_model_name)
        client = chromadb.HttpClient(host=chroma_host, port=chroma_port)
        _vectorstore_instance = Chroma(
            client=client,
            collection_name=collection_name,
            embedding_function=embeddings
        )
    return _vectorstore_instance

def run_query_service(
    filter_dict: Dict
) -> List[Dict[str, Any]]:
    """
    Main entry point for the direct query service.
    Retrieves ALL documents from the vector store that match a metadata filter.
    This function does NOT perform a semantic search.

    Args:
        vectorstore: The initialized Chroma vector store object.
        filter_dict: The dictionary defining the metadata filter (e.g., {"author": "Curry"}).

    Returns:
        A list of dictionaries, where each dictionary represents a
        document matching the filter.
    """
    vectorstore = get_vectorstore()
    
    if not filter_dict:
        print("Warning: An empty filter was provided. Returning no documents.")
        return []

    print(f"Fetching all documents matching filter: {filter_dict}")

    # The .get() method performs the direct, filter-based retrieval.
    # It fetches all matching documents by default if no limit is specified.
    results = vectorstore.get(
        where=filter_dict,
        include=["metadatas", "documents"],
    )

    # Check if any documents were returned by looking at the 'ids' list
    if not results.get("ids"):
        print("Found 0 documents matching the filter.")
        return []

    # Format the results into a simple list of dictionaries for API serialization.
    response_documents = []
    ids = results.get("ids", [])
    documents = results.get("documents", [])
    metadatas = results.get("metadatas", [])

    for i in range(len(ids)):
        response_documents.append(
            {"id": ids[i], "content": documents[i], "metadata": metadatas[i]}
        )
    
    print(f"Found and returning {len(response_documents)} documents.")
    return response_documents