#!/bin/sh
# This script ensures the Ollama server starts and then pulls the necessary models
# into the persistent volume.

# Start the Ollama server in the background.
ollama serve &

# Capture the Process ID (PID) of the server.
PID=$!

echo "Ollama server process started with PID: $PID"

# Give the server a few seconds to initialize before we start pulling models.
sleep 3

echo "Pulling model: llama3.1..."
# This command runs *after* the volume has been mounted by Docker Compose,
# so the model will be saved in the persistent volume.
ollama pull llama3.1

echo "Model pulling complete."
echo "Ollama is ready to serve requests."

# Wait for the server process to exit. This command is crucial as it keeps
# the container running after the script finishes.
wait $PID