import argparse
import yaml
import chromadb
from sentence_transformers import SentenceTransformer
from pprint import pprint

def load_config(path: str = "config.yaml") -> dict:
    """
    Loads configuration from a YAML file.
    """
    try:
        with open(path, "r", encoding="utf-8") as f:
            return yaml.safe_load(f)
    except FileNotFoundError:
        print(f"Error: Configuration file '{path}' not found.")
        print("Please ensure a config.yaml file exists in the same directory.")
        exit(1)

class ChromaQuery:
    """
    Handles querying a ChromaDB collection.
    """
    def __init__(self, cfg: dict):
        """
        Initializes the ChromaDB client, collection, and embedding model.
        """
        try:
            # Load configuration
            self.model_name = cfg['model']['name']
            host = cfg['chromadb']['host']
            port = cfg['chromadb']['port']
            self.collection_name = cfg['collection']

            # Initialize the embedding model
            print(f"Loading embedding model: '{self.model_name}'...")
            self.embedding_model = SentenceTransformer(self.model_name)
            print("Model loaded successfully.")

            # Connect to ChromaDB
            self.client = chromadb.HttpClient(host=host, port=port)
            print(f"Connected to ChromaDB at {host}:{port}")

            # Get the collection
            self.collection = self.client.get_collection(name=self.collection_name)
            print(f"Successfully connected to collection: '{self.collection_name}'")

        except Exception as e:
            print(f"An error occurred during initialization: {e}")
            print("Please ensure ChromaDB is running and the collection has been seeded.")
            exit(1)

    def search(self, query_text: str, n_results: int):
        """
        Performs a similarity search on the collection.

        Args:
            query_text: The text to search for.
            n_results: The number of results to return.
        """
        if not query_text:
            print("Error: Query text cannot be empty.")
            return

        print("\n" + "="*50)
        print(f"Searching for: '{query_text}'")
        print(f"Returning top {n_results} results...")
        print("="*50 + "\n")

        try:
            # 1. Generate an embedding for the user's query text
            query_embedding = self.embedding_model.encode(query_text).tolist()

            # 2. Query the collection
            results = self.collection.query(
                query_embeddings=[query_embedding],
                n_results=n_results,
                include=["metadatas", "documents", "distances"] # IMPORTANT: include all desired data
            )

            # 3. Process and display the results
            if not results['ids'][0]:
                print("No results found.")
                return

            for i in range(len(results['ids'][0])):
                distance = results['distances'][0][i]
                metadata = results['metadatas'][0][i]
                document = results['documents'][0][i]

                print(f"--- Result {i+1} ---")
                # The distance score is a measure of dissimilarity. Lower is better.
                print(f"Distance Score: {distance:.4f}") 
                
                print("\n[METADATA]")
                pprint(metadata)
                
                print("\n[CONTENT]")
                print(document)
                print("\n" + "="*50 + "\n")

        except Exception as e:
            print(f"An error occurred during search: {e}")


def main():
    """
    Main function to run the script from the command line.
    """
    parser = argparse.ArgumentParser(
        description="Query a ChromaDB collection for documents similar to your text query."
    )
    parser.add_argument(
        "query", 
        type=str, 
        help="The text you want to search for."
    )
    parser.add_argument(
        "-n", "--n_results", 
        type=int, 
        default=None, # Set default to None to detect if user provided it
        help="The number of results to return. Overrides config file setting."
    )
    parser.add_argument(
        '-c', '--config',
        type=str,
        default='config.yaml',
        help='Path to the YAML configuration file.'
    )

    args = parser.parse_args()
    cfg = load_config(args.config)
    
    # Determine the number of results to fetch.
    # Priority: 1. Command-line arg, 2. Config file, 3. Default (5)
    if args.n_results is not None:
        n_results = args.n_results
    else:
        n_results = cfg.get('search', {}).get('top_k', 5)

    query_engine = ChromaQuery(cfg)
    query_engine.search(args.query, n_results)


if __name__ == "__main__":
    main()