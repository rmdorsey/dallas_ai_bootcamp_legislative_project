import yaml
import chromadb
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from typing import Dict

def load_config(config_path: str = 'config.yaml') -> Dict:
    """
    Loads configuration settings from a YAML file.

    Args:
        config_path: The path to the YAML configuration file.

    Returns:
        A dictionary containing the configuration settings.
    """
    print(f"Loading configuration from {config_path}...")
    with open(config_path, 'r') as f:
        config = yaml.safe_load(f)
    return config

def main():
    """
    Main function to run the command-line query application.
    """
    # Load configuration from the YAML file
    config = load_config()
    
    # Extract settings from the config dictionary
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
    
    # Initialize the vector store with the existing collection
    vector_store = Chroma(
        client=client,
        collection_name=chroma_collection_name,
        embedding_function=embeddings,
    )
    
    print("\nChromaDB query application initialized. Ready for queries.")
    print("Type 'exit' or 'quit' to end the application.")

    # --- Main Query Loop ---
    while True:
        query = input("\nEnter your query: ")
        if query.lower() in ['exit', 'quit']:
            print("Exiting application.")
            break
        
        if not query.strip():
            continue

        print("\nSearching for relevant sections...")
        # Perform the similarity search
        try:
            # Use similarity_search_with_score to get documents and their scores
            results_with_scores = vector_store.similarity_search_with_score(query, k=5)
            
            if not results_with_scores:
                print("No relevant documents found.")
                continue

            # Display the results
            print(f"\n--- Top {len(results_with_scores)} relevant sections found ---")
            for i, (doc, score) in enumerate(results_with_scores):
                metadata = doc.metadata
                
                # The 'score' is the L2 distance. A lower score is better.
                print(f"\n--- Result {i+1} | Distance Score: {score:.4f} (Lower is better) ---")
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
