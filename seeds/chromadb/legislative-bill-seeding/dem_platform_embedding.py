import requests
from bs4 import BeautifulSoup
import os
import json
import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import argparse

# -----------------------
# CONFIGURATION
# -----------------------

# Default configuration - can be overridden via command line or config file
DEFAULT_CONFIG = {
    "url": "https://www.texasdemocrats.org/platform",
    "model_name": "sentence-transformers/all-mpnet-base-v2",
    "chunk_size": 300,
    "output_dir": "output",
    "platform_file": "dem_platform.txt",
    "embeddings_file": "dem_platform_embeddings.json",
    "test_query": "What do Democrats say about public education?"
}

def load_config():
    """Load configuration from file if it exists, otherwise use defaults."""
    config_file = "config.json"
    if os.path.exists(config_file):
        with open(config_file, "r", encoding="utf-8") as f:
            user_config = json.load(f)
        # Merge with defaults
        config = {**DEFAULT_CONFIG, **user_config}
        print(f"📋 Loaded configuration from {config_file}")
    else:
        config = DEFAULT_CONFIG
        print("📋 Using default configuration")
    return config

def parse_args():
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(description="Generate embeddings for platform text")
    parser.add_argument("--url", help="URL to scrape platform text from")
    parser.add_argument("--model", help="SentenceTransformer model name")
    parser.add_argument("--chunk-size", type=int, help="Maximum tokens per chunk")
    parser.add_argument("--output-dir", help="Output directory for files")
    parser.add_argument("--query", help="Test query for similarity search")
    return parser.parse_args()

def get_final_config():
    """Get final configuration by merging defaults, config file, and command line args."""
    config = load_config()
    args = parse_args()
    
    # Override with command line arguments if provided
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

# -----------------------
# STEP 1: DOWNLOAD THE PLATFORM TEXT
# -----------------------

def download_platform_text(url, output_file):
    """Download and save platform text from URL."""
    print(f"📥 Downloading platform text from: {url}")
    
    response = requests.get(url)
    response.raise_for_status()  # Raise an exception for bad status codes
    
    soup = BeautifulSoup(response.text, 'html.parser')
    text = soup.get_text(separator="\n", strip=True)
    
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(text)
    
    print(f"✅ Downloaded and saved platform text to: {output_file}")
    return text

# -----------------------
# STEP 2: CHUNK THE TEXT
# -----------------------

def chunk_text(text, max_tokens=300):
    """Split text into chunks of specified size."""
    words = text.split()
    return [' '.join(words[i:i + max_tokens]) for i in range(0, len(words), max_tokens)]

# -----------------------
# STEP 3: GENERATE EMBEDDINGS
# -----------------------

def generate_embeddings(chunks, model_name):
    """Generate embeddings for text chunks using specified model."""
    print(f"\n🤖 Generating embeddings using model: {model_name}")
    
    model = SentenceTransformer(model_name)
    embeddings = model.encode(chunks)
    
    print(f"✅ Generated embeddings for {len(chunks)} chunks")
    return embeddings, model

# -----------------------
# STEP 4: SAVE EMBEDDINGS
# -----------------------

def save_embeddings(chunks, embeddings, output_path, config):
    """Save chunks and embeddings to JSON file."""
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

# -----------------------
# STEP 5: TEST SEARCH
# -----------------------

def test_search(chunks, embeddings, model, query):
    """Test similarity search with a query."""
    print(f"\n🔎 Test query: '{query}'")
    
    query_embedding = model.encode([query])
    similarities = cosine_similarity(query_embedding, embeddings)
    top_index = int(np.argmax(similarities))
    
    print(f"\n📌 Most relevant chunk (similarity: {similarities[0][top_index]:.4f}):\n")
    print(chunks[top_index])

# -----------------------
# MAIN EXECUTION
# -----------------------

def main():
    """Main execution function."""
    config = get_final_config()
    
    print("🚀 Starting platform embedding generation")
    print(f"📊 Configuration: {json.dumps(config, indent=2)}")
    
    # Create output directory
    os.makedirs(config["output_dir"], exist_ok=True)
    
    # Step 1: Download platform text
    platform_file_path = os.path.join(config["output_dir"], config["platform_file"])
    text = download_platform_text(config["url"], platform_file_path)
    
    # Step 2: Chunk the text
    chunks = chunk_text(text, config["chunk_size"])
    print(f"✅ Total chunks created: {len(chunks)}")
    print(f"🔍 First chunk preview:\n{chunks[0][:500]}...")
    
    # Step 3: Generate embeddings
    embeddings, model = generate_embeddings(chunks, config["model_name"])
    
    # Step 4: Save embeddings
    embeddings_path = os.path.join(config["output_dir"], config["embeddings_file"])
    save_embeddings(chunks, embeddings, embeddings_path, config)
    
    # Step 5: Test search
    test_search(chunks, embeddings, model, config["test_query"])
    
    print("\n🎉 Process completed successfully!")

if __name__ == "__main__":
    main()
