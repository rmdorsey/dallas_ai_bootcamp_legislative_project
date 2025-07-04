import chromadb

def list_collections(chroma_host, chroma_port):
    client = chromadb.HttpClient(host=chroma_host, port=chroma_port)
    collections = client.list_collections()

    print("📦 Available collections in ChromaDB:")
    for c in collections:
        print(f" - {c.name}")

def show_collection_content(chroma_host, chroma_port, collection_name):
    client = chromadb.HttpClient(host=chroma_host, port=chroma_port)
    collection = client.get_collection(name=collection_name)

    results = collection.get(include=["documents", "embeddings", "metadatas"])
    print(f"\n📄 {len(results['ids'])} documents in collection '{collection_name}':")

    for doc_id, doc in zip(results["ids"], results["documents"]):
        print(f"\n🆔 ID: {doc_id}\n📃 Text: {doc[:150]}...")  # only show the first 150 characters

# Update with your values
CHROMA_HOST = "localhost"
CHROMA_PORT = 8001
COLLECTION_NAME = "dem_platform_chunks"

if __name__ == "__main__":
    list_collections(CHROMA_HOST, CHROMA_PORT)
    show_collection_content(CHROMA_HOST, CHROMA_PORT, COLLECTION_NAME)