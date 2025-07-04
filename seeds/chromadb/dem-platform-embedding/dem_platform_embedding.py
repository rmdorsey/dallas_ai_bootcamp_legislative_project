from typing import List

import requests
from bs4 import BeautifulSoup
import os
import json
import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import argparse
import yaml
import chromadb
from chromadb.config import Settings
from langchain.vectorstores import Chroma
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.schema import Document


# -----------------------
# METHODS
# -----------------------

def load_config():
    """
       Load configuration from the config.yaml file.

       Returns:
           dict: Parsed configuration data.

       Raises:
           FileNotFoundError: If the config file does not exist.
       """
    config_file = "config.yaml"
    if os.path.exists(config_file):
        with open(config_file, "r", encoding="utf-8") as f:
            config = yaml.safe_load(f)
        print(f"Loaded configuration from {config_file}")
        return config
    else:
        raise FileNotFoundError(f"{config_file} not found. Please create it with proper settings.")

def parse_args():
    """
    Parse command-line arguments for overriding config values.

    Returns:
        argparse.Namespace: Parsed arguments.
    """
    parser = argparse.ArgumentParser(description="Generate embeddings for platform text")
    parser.add_argument("--url", help="URL to scrape platform text from")
    parser.add_argument("--model", help="SentenceTransformer model name")
    parser.add_argument("--chunk-size", type=int, help="Maximum tokens per chunk")
    parser.add_argument("--output-dir", help="Output directory for files")
    parser.add_argument("--query", help="Test query for similarity search")
    return parser.parse_args()


def get_final_config():
    """
       Merge YAML config with any CLI arguments to produce the final configuration.

       Returns:
           dict: Final configuration after merging.
       """
    config = load_config()
    args = parse_args()

    if args.url:
        config["url"] = args.url
    if args.model:
        config["model_name"] = args.model
    if args.chunk_size:
        config["chunk_size"] = args.chunk_size
    if args.output_dir:
        config["output_dir"] = args.output_dir
    if args.query:
        config["test_query"] = args.query

    return config


def download_platform_text(url, output_file):
    """
    Download the platform text from a given URL and save it to a file.

    Args:
        url (str): The URL to scrape the text from.
        output_file (str): Path to the file where text will be saved.

    Returns:
        str: Raw platform text content.

    Raises:
        requests.HTTPError: If the request to the URL fails.
    """
    print(f"Downloading platform text from: {url}")
    
    response = requests.get(url)
    response.raise_for_status()  # Raise an exception for bad status codes
    
    soup = BeautifulSoup(response.text, 'html.parser')
    text = soup.get_text(separator="\n", strip=True)
    
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(text)
    
    print(f"Downloaded and saved platform text to: {output_file}")
    return text


def chunk_text(text, max_tokens=300):
    """
        Split the full text into smaller chunks of a specified word size.

        Args:
            text (str): The full text to be chunked.
            max_tokens (int): Number of words per chunk.

        Returns:
            list[str]: List of text chunks.
        """
    words = text.split()
    return [' '.join(words[i:i + max_tokens]) for i in range(0, len(words), max_tokens)]

def generate_embeddings(chunks, model_name):
    """
    Generate vector embeddings for each text chunk.

    Args:
        chunks (list[str]): List of text chunks.
        model_name (str): SentenceTransformer model to use.

    Returns:
        tuple: A tuple containing:
            - np.ndarray: Embeddings for each chunk.
            - SentenceTransformer: Loaded model instance.
    """
    print(f"\n Generating embeddings using model: {model_name}")
    
    model = SentenceTransformer(model_name)
    embeddings = model.encode(chunks)
    
    print(f"Generated embeddings for {len(chunks)} chunks")
    return embeddings, model


def save_embeddings_as_json(chunks, embeddings, output_path, config):
    """
       Save the text chunks and their embeddings to a JSON file.

       Args:
           chunks (list[str]): Original text chunks.
           embeddings (np.ndarray): Embedding vectors.
           output_path (str): Output file path.
           config (dict): Configuration used in the run.

       Returns:
           None
       """
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    data = {
        "config": config,  # Save configuration for reference
        "chunks": [
            {"chunk": chunk, "embedding": embedding.tolist()} 
            for chunk, embedding in zip(chunks, embeddings)
        ]
    }
    
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)
    
    print(f"✅ Embeddings saved to: {output_path}")

def insert_embeddings_into_chromadb(chunks, embeddings, config):
    """
    Insert the text chunks and their embeddings into ChromaDB.

    Args:
        chunks (list[str]): Original text chunks.
        embeddings (np.ndarray): Embedding vectors.
        config (dict): Configuration settings.

    Returns:
        None
    """
    print("Inserting embeddings into ChromaDB...")

    # Initialize ChromaDB client
    client = chromadb.Client(Settings(
        persist_directory=config["output"]["directory"],  # Folder to store ChromaDB data
        chroma_db_impl="duckdb+parquet"
    ))

    # Create or get collection
    collection_name = config["output"].get("collection_name", "dem_platform_chunks")
    collection = client.get_or_create_collection(name=collection_name)

    # Insert documents
    for i, (chunk, embedding) in enumerate(zip(chunks, embeddings)):
        collection.add(
            documents=[chunk],
            embeddings=[embedding.tolist()],
            ids=[f"chunk_{i}"]
        )

    print(f"✅ Inserted {len(chunks)} embeddings into ChromaDB collection '{collection_name}'")


def upsert_to_chroma(documents, embedding, collection_name, chroma_host, chroma_port):
    """
    Upserts a list of documents into a ChromaDB collection.

    Args:
        documents (list): A list of LangChain Document objects.
        embedding: A HuggingFaceEmbeddings object.
        collection_name (str): The name of the ChromaDB collection.
        chroma_host (str): Host where ChromaDB is running (e.g., 'localhost').
        chroma_port (int): Port where ChromaDB is running (e.g., 8000).
    """
    print(f"Connecting to ChromaDB at {chroma_host}:{chroma_port}")

    client = chromadb.HttpClient(host=chroma_host, port=chroma_port)

    print(f"📤 Upserting {len(documents)} documents to collection '{collection_name}'...")

    Chroma.from_documents(
        client=client,
        documents=documents,
        embedding=embedding,
        collection_name=collection_name
    )

    print("Successfully upserted documents to ChromaDB.")

def test_search(chunks, embeddings, model, query):
    """
        Run a test similarity search using a query against the embeddings.

        Args:
            chunks (list[str]): Original text chunks.
            embeddings (np.ndarray): Embedding vectors.
            model (SentenceTransformer): Model used to encode the query.
            query (str): Text query for testing.

        Returns:
            None
        """
    print(f"\n🔎 Test query: '{query}'")
    
    query_embedding = model.encode([query])
    similarities = cosine_similarity(query_embedding, embeddings)
    top_index = int(np.argmax(similarities))
    
    print(f"\n Most relevant chunk (similarity: {similarities[0][top_index]:.4f}):\n")
    print(chunks[top_index])

# -----------------------
# MAIN EXECUTION
# -----------------------

def main():
    """
    Main execution pipeline:
    - Load configuration
    - Download text
    - Chunk text
    - Generate embeddings
    - Save results
    - Run similarity test
    """
    config = get_final_config()

    # Extract settings from the config dictionary
    platform_config = config.get('platform', {})
    embedding_config = config.get('embedding', {})
    output_config = config.get('output', {})
    chroma_config = config.get('chromadb', {})

    platform_url = platform_config.get('url', None)
    platform_chunk_size = platform_config.get('chunk_size', 300)
    platform_test_query = platform_config.get('test_query', 'What do Democrats say about public education?')

    embedding_model_name = embedding_config.get('model_name', 'nlpaueb/legal-bert-base-uncased')

    output_directory = output_config.get('output', 'output')
    output_platform_file = output_config.get('dem_platform.txt', 'dem_platform.txt')
    output_embeddings_file = output_config.get('dem_platform_embeddings.json', 'dem_platform_embeddings.json')

    chroma_collection_name = chroma_config.get('collection_name', 'dem_platform_chunks')
    chroma_server_host = chroma_config.get('host', 'localhost')
    chroma_server_port = chroma_config.get('port', 8001)
    
    print("Starting platform embedding generation")
    print(f"Configuration: {json.dumps(config, indent=2)}")
    
    # Create output directory
    os.makedirs(output_directory, exist_ok=True)
    
    # Step 1: Download platform text
    platform_file_path = os.path.join(output_directory, output_platform_file)
    text = download_platform_text(platform_url, platform_file_path)
    
    # Step 2: Chunk the text
    chunks = chunk_text(text, platform_chunk_size)
    print(f"Total chunks created: {len(chunks)}")
    print(f"First chunk preview:\n{chunks[0][:500]}...")

    # Step 3: Generate embeddings
    embeddings, model = generate_embeddings(chunks, embedding_model_name)
    
    # Step 4: Save embeddings as json
    embeddings_path = os.path.join(output_directory, output_embeddings_file)
    save_embeddings_as_json(chunks, embeddings, embeddings_path, config)

    # Step 5: Upsert the embedding to chroma
    documents = [Document(page_content=chunk) for chunk in chunks]
    embedding_model = HuggingFaceEmbeddings(model_name=embedding_model_name)

    upsert_to_chroma(
        documents=documents,
        embedding=embedding_model,
        collection_name=chroma_collection_name,
        chroma_host=chroma_server_host,
        chroma_port=chroma_server_port
    )

    # Step 5: Test search
    test_search(chunks, embeddings, model, platform_test_query)
    
    print("\n Process completed successfully!")

if __name__ == "__main__":
    main()
