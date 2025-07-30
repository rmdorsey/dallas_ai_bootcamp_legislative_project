# Start from the official ChromaDB image
FROM chromadb/chroma:1.0.12

# This image is Debian-based, so use apt-get to install curl
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*