import os
from dotenv import load_dotenv
from typing import List, Dict, Tuple, Optional, Any
from langchain_core.documents import Document
from langchain_huggingface import HuggingFaceEmbeddings
import chromadb
from langchain_chroma import Chroma
import json

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
    bill_number: int,
    chamber: str,
    article_title: Optional[str]=None, 
    article_number: Optional[str]=None, 
    section_number: Optional[str]=None,
    k: int = 50
) -> any:
    """
    Creates a LangChain retriever with a dynamic metadata filter and document limit.
    """
    search_kwargs = {"k": k}
    
    # ChromaDB's `where` filter requires an operator like '$and' or '$or'
    # when combining multiple conditions.
    filter_conditions = []
    if bill_number:
        filter_conditions.append({"bill_number": {"$eq": bill_number}})
    if chamber:
        filter_conditions.append({"chamber": {"$eq": chamber}})
    if article_title:
        filter_conditions.append({"article_title": {"$eq": article_title}})
    if article_number:
        filter_conditions.append({"article_number": {"$eq": article_number}})
    if section_number:
        filter_conditions.append({"section_number": {"$eq": section_number}})

    # Combine all conditions with an '$and' operator.
    if len(filter_conditions) > 0:
        search_kwargs["filter"] = {"$and": filter_conditions}

    return vectorstore.as_retriever(search_kwargs=search_kwargs)

def run_search_service_on_single_bill(query: str, bill_number: int, chamber: str, article_title: Optional[str]=None, article_number: Optional[str]=None, section_number: Optional[str]=None, k: int=50) -> List[Dict[str, Any]]:
    """
    Main entry point for the semantic search service.

    Args:
        query: The user's text query for semantic search.
        bill_number: Optional bill_number filter.
        chamber: Optional chamber filter.
        article_number: Optional article number filter.
        section_number: Optional section filter.
        article_title: Optional article title filter.
        k: The maximum number of documents to retrieve initially.

    Returns:
        A list of dictionaries, where each dictionary represents an
        API-friendly response to a bill question.
    """
    # Get the singleton instance of the vector store
    vectorstore = get_vectorstore()
    retriever = create_dynamic_retriever(vectorstore, bill_number, chamber, article_title, article_number, section_number, k)
    raw_results = retriever.invoke(query)
    # processed_docs, bill_counts = process_and_dedupe_results(raw_results)
    final_results = []
    for doc in raw_results:
        meta = doc.metadata
        result = {
            "content": doc.page_content,
            "metadata": meta,
        }
        final_results.append(result)
    return final_results