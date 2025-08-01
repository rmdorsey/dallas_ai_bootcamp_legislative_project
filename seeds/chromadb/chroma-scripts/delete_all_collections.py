import chromadb
import sys

# From your docker-compose.yml, ChromaDB is on host port 8001
CHROMA_HOST = "localhost"
CHROMA_PORT = 8001

print("--- Running Diagnostic Script ---")
print(f"Attempting to connect to ChromaDB at {CHROMA_HOST}:{CHROMA_PORT}...")

try:
    client = chromadb.HttpClient(host=CHROMA_HOST, port=CHROMA_PORT)
    # This will raise an exception if the server is not reachable.
    client.heartbeat() 
    print("Connection successful.")

    print("Fetching list of collections...")
    collections = client.list_collections()
    
    if not collections:
        print("Result: No collections found. The database is empty.")
        sys.exit(0)

    print(f"Result: Found {len(collections)} collections to be DELETED:")
    for collection in collections:
        print(f" - {collection.name}")

    # Confirmation step
    confirm = input("\nAre you sure you want to delete all of the collections listed above? (y/n): ")

    if confirm.lower() == 'y':
        print("\nDeleting collections...")
        for collection in collections:
            print(f" - Deleting '{collection.name}'...")
            client.delete_collection(name=collection.name)
        print("\nAll collections have been deleted.")
    else:
        print("\nOperation cancelled.")

except Exception as e:
    print(f"\n--- An error occurred ---")
    print(f"Error details: {e}")

print("\n--- Script finished ---")