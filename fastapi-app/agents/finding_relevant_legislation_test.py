from typing import List, Dict, Tuple, Optional
from langchain_core.documents import Document
import chromadb
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma
import os
from dotenv import load_dotenv

load_dotenv(dotenv_path='../.env')
os.environ["LANGCHAIN_TRACING_V2"] = "false"

# ==================== HELPER FUNCTION START ====================

def create_dynamic_retriever(
    vectorstore, 
    author: Optional[str] = None, 
    bill_number: Optional[str] = None, 
    chamber: Optional[str] = None,
    k: int = 50
):
    """
    Creates a retriever with a dynamic metadata filter and document limit.
    """
    search_kwargs = {"k": k}
    
    filter_dict = {}
    if author:
        filter_dict["author"] = author
    if bill_number:
        filter_dict["bill_number"] = bill_number
    if chamber:
        filter_dict["chamber"] = chamber

    if filter_dict:
        search_kwargs["filter"] = filter_dict
        print(f"\nApplying dynamic filter: {filter_dict}")
    else:
        print("\nNo filter applied. Searching all documents.")

    print(f"Retriever will return a maximum of {k} documents.")
    return vectorstore.as_retriever(search_kwargs=search_kwargs)

def process_and_dedupe_results(results: List[Document]) -> Tuple[List[Document], Dict[Tuple[str, str], int]]:
    """
    Counts, orders, and deduplicates retriever results by a composite key of (bill_number, chamber).
    """
    if not results:
        return [], {}

    bill_groups = {}
    for doc in results:
        # Create a composite key from bill_number and chamber for unique identification
        bill_number = doc.metadata.get("bill_number", "N/A")
        chamber = doc.metadata.get("chamber", "N/A")
        bill_key = (bill_number, chamber)  # <-- The key is now a tuple

        if bill_key not in bill_groups:
            bill_groups[bill_key] = {
                "best_doc": doc,
                "count": 1
            }
        else:
            bill_groups[bill_key]["count"] += 1

    # Sorting logic remains the same, as it operates on the 'count' value
    sorted_groups = sorted(bill_groups.values(), key=lambda x: x["count"], reverse=True)

    # Extract the deduplicated documents in the new order
    final_docs = [group["best_doc"] for group in sorted_groups]

    # Create a count dictionary using the same composite key for accurate lookup
    bill_counts = {}
    for group in sorted_groups:
        doc_meta = group["best_doc"].metadata
        key = (doc_meta.get("bill_number", "N/A"), doc_meta.get("chamber", "N/A"))
        bill_counts[key] = group["count"]

    return final_docs, bill_counts

# ===================== HELPER FUNCTION END =====================
# --- Configuration & Initialization ---
embedding_model_name = 'sentence-transformers/all-mpnet-base-v2'
chroma_collection_name = 'legislation-89-1'
chroma_server_host = 'localhost'
chroma_server_port = 8001

print(f"\nInitializing embedding model: {embedding_model_name}")
embeddings = HuggingFaceEmbeddings(model_name=embedding_model_name)
print(f"Connecting to ChromaDB at {chroma_server_host}:{chroma_server_port}")
client = chromadb.HttpClient(host=chroma_server_host, port=chroma_server_port)
vectorstore = Chroma(client=client, collection_name=chroma_collection_name, embedding_function=embeddings)

# --- Set your desired filters here ---
AUTHOR_TO_SEARCH = None
BILL_TO_SEARCH = None
CHAMBER_TO_SEARCH = None

# --- Create retriever and get raw results ---
retriever = create_dynamic_retriever(vectorstore, author=AUTHOR_TO_SEARCH, bill_number=BILL_TO_SEARCH, chamber=CHAMBER_TO_SEARCH, k=50)
raw_results = retriever.invoke("Any bills on banning tax payer lobbying?")

# ==================== NEW PROCESSING STEP ====================
processed_docs, bill_counts = process_and_dedupe_results(raw_results)
# =============================================================

# --- Print Processed Results ---
print(f"\n--- Found {len(raw_results)} total matching documents, processed down to {len(processed_docs)} unique bills ---")
for i, doc in enumerate(processed_docs):
    # Re-create the composite key to look up the count
    bill_number = doc.metadata.get("bill_number", "N/A")
    chamber = doc.metadata.get("chamber", "N/A")
    count = bill_counts.get((bill_number, chamber), 0)
    
    # Updated print statement for more clarity
    print(f"--- Result {i+1}: {chamber} Bill {bill_number} (Matched {count} document chunks) ---")
    
    print("\nCONTENT (from most relevant chunk):")
    print(f"  {doc.page_content}")
    print("\nMETADATA:")
    for key, value in doc.metadata.items():
        print(f"  - {key}: {value}")
    print("\n" + "="*80 + "\n")