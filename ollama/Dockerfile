# Start from the official Ollama base image
FROM ollama/ollama:latest

# Install wget, which we'll use to check if the server is up
RUN apt-get update && apt-get install -y wget && rm -rf /var/lib/apt/lists/*

# Reliably start the server, wait for it to be ready, pull the model,
# and then stop the server. This all happens during the image build.
RUN /bin/sh -c ' \
    ollama serve & \
    OLLAMA_PID=$! && \
    while ! wget -q --spider http://localhost:11434; do \
        echo "Waiting for Ollama server..." && \
        sleep 1; \
    done && \
    ollama pull llama3.1 && \
    kill $OLLAMA_PID \
'