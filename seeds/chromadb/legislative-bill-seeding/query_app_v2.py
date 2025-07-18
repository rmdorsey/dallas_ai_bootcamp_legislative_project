import yaml
import chromadb
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from sentence_transformers import CrossEncoder # ### NEW ###
from typing import Dict, List
from langchain.docstore.document import Document

def load_config(config_path: str = 'config.yaml') -> Dict:
    """
    Loads configuration settings from a YAML file.
    """
    print(f"Loading configuration from {config_path}...")
    with open(config_path, 'r') as f:
        config = yaml.safe_load(f)
    return config

def main():
    """
    Main function to run the query app with a Cross-Encoder for re-ranking.
    """
    config = load_config()
    chroma_config = config.get('chromadb', {})
    embedding_config = config.get('embedding', {})

    embedding_model_name = embedding_config.get('model_name', 'nlpaueb/legal-bert-base-uncased')
    chroma_collection_name = chroma_config.get('collection_name', 'legislation-89-r')
    chroma_server_host = chroma_config.get('host', 'localhost')
    chroma_server_port = chroma_config.get('port', 8001)

    # --- Initialize ChromaDB and Retriever ---
    print(f"\nInitializing embedding model: {embedding_model_name}")
    embeddings = HuggingFaceEmbeddings(model_name=embedding_model_name)
    
    print(f"Connecting to ChromaDB at {chroma_server_host}:{chroma_server_port}")
    client = chromadb.HttpClient(host=chroma_server_host, port=chroma_server_port)
    
    vector_store = Chroma(
        client=client,
        collection_name=chroma_collection_name,
        embedding_function=embeddings,
    )
    
    # ### NEW: Initialize the Cross-Encoder model ###
    # This model is specifically trained for ranking tasks.
    print("Initializing Cross-Encoder model for re-ranking...")
    cross_encoder = CrossEncoder('cross-encoder/ms-marco-MiniLM-L-6-v2')
    
    print("\nApplication initialized. Ready for queries.")
    print("Type 'exit' or 'quit' to end the application.")

    # --- Main Query Loop ---
    while True:
        query = input("\nEnter your query: ")
        if query.lower() in ['exit', 'quit']:
            print("Exiting application.")
            break
        
        if not query.strip():
            continue

        # --- STEP 1: Initial Retrieval (Candidate Generation) ---
        print("\nStep 1: Fetching initial candidates from vector store...")
        # Fetch a larger number of candidates to give the re-ranker more to work with.
        try:
            candidate_docs = vector_store.similarity_search(query, k=35)
            
            if not candidate_docs:
                print("No relevant documents found in initial search.")
                continue

            print(f"Found {len(candidate_docs)} initial candidates.")

            # --- STEP 2: Re-Ranking with Cross-Encoder ---
            print("\nStep 2: Re-ranking candidates with Cross-Encoder...")
            
            # Create pairs of [query, document_content] for the cross-encoder
            model_input_pairs = [[query, doc.page_content] for doc in candidate_docs]
            
            # Get scores from the cross-encoder
            scores = cross_encoder.predict(model_input_pairs)
            
            # Combine the original documents with their new scores
            reranked_results = list(zip(scores, candidate_docs))
            
            # Sort the results by the new score in descending order
            reranked_results.sort(key=lambda x: x[0], reverse=True)
            
            # --- Display the final, re-ranked results ---
            print(f"\n--- Top 5 re-ranked relevant sections found ---")
            
            # Display the top 5 results from the re-ranked list
            for i, (score, doc) in enumerate(reranked_results[:5]):
                metadata = doc.metadata
                print(f"\n--- Result {i+1} | Re-ranking Score: {score:.4f} (Higher is better) ---")
                print(f"Source: {metadata.get('source', 'N/A')}, Page: {metadata.get('page', 'N/A')}")
                print(f"Article: {metadata.get('article_number', 'N/A')} - {metadata.get('article_title', 'N/A')}")
                print(f"Section: {metadata.get('section_number', 'N/A')}")
                print("-" * 20)
                print(doc.page_content)
                print("-" * 20)

        except Exception as e:
            print(f"An error occurred during search: {e}")

if __name__ == "__main__":
    main()