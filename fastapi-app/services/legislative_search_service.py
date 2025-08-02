import os
from dotenv import load_dotenv
from typing import List, Dict, Tuple, Optional, Any
from langchain_core.documents import Document
from langchain_huggingface import HuggingFaceEmbeddings
import chromadb
from langchain_chroma import Chroma

_vectorstore_instance = None

def get_vectorstore():
    global _vectorstore_instance
    if _vectorstore_instance is None:
        print("Initializing vector store from Search Service...")
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

def create_dynamic_retriever(
    vectorstore: Chroma,
    author: Optional[str] = None,
    bill_number: Optional[str] = None,
    chamber: Optional[str] = None,
    k: int = 50
) -> any:
    """
    Creates a LangChain retriever with a dynamic metadata filter and document limit.
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

    return vectorstore.as_retriever(search_kwargs=search_kwargs)


def process_and_dedupe_results(
    results: List[Document]
) -> Tuple[List[Document], Dict[Tuple[str, str], int]]:
    """
    Counts, orders, and deduplicates retriever results by a composite key of (bill_number, chamber).
    """
    if not results:
        return [], {}

    bill_groups = {}
    for doc in results:
        bill_number = doc.metadata.get("bill_number", "N/A")
        chamber = doc.metadata.get("chamber", "N/A")
        bill_key = (bill_number, chamber)

        if bill_key not in bill_groups:
            bill_groups[bill_key] = {"best_doc": doc, "count": 1}
        else:
            bill_groups[bill_key]["count"] += 1

    sorted_groups = sorted(
        bill_groups.values(), key=lambda x: x["count"], reverse=True
    )

    final_docs = [group["best_doc"] for group in sorted_groups]

    bill_counts = {}
    for group in sorted_groups:
        doc_meta = group["best_doc"].metadata
        key = (doc_meta.get("bill_number", "N/A"), doc_meta.get("chamber", "N/A"))
        bill_counts[key] = group["count"]

    return final_docs, bill_counts


def run_search_service(query: str, author: Optional[str], bill_number: Optional[str], chamber: Optional[str], k: int) -> List[Dict[str, Any]]:
    """
    Main entry point for the semantic search service.

    Args:
        query: The user's text query for semantic search.
        author: Optional author filter.
        bill_number: Optional bill_number filter.
        chamber: Optional chamber filter.
        k: The maximum number of documents to retrieve initially.

    Returns:
        A list of dictionaries, where each dictionary represents a
        processed, deduplicated, and API-friendly bill result.
    """
    # Get the singleton instance of the vector store
    vectorstore = get_vectorstore()
    retriever = create_dynamic_retriever(vectorstore, author, bill_number, chamber, k)
    raw_results = retriever.invoke(query)
    processed_docs, bill_counts = process_and_dedupe_results(raw_results)
    final_results = []
    for doc in processed_docs:
        meta = doc.metadata
        bill_num = meta.get("bill_number", "N/A")
        cham = meta.get("chamber", "N/A")
        result = {
            "bill_number": bill_num,
            "chamber": cham,
            "relevance_count": bill_counts.get((bill_num, cham), 0),
            "content": doc.page_content,
            "metadata": meta,
        }
        final_results.append(result)
    return final_results