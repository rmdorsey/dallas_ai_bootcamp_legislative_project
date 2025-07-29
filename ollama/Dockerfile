# Start from the official Ollama base image
FROM ollama/ollama:latest

# This command runs *during the image build process*.
# 1. Start the ollama server in the background (`ollama serve &`)
# 2. Wait for 10 seconds to give the server time to initialize (`sleep 10`)
# 3. Run the pull command, which can now connect to the background server.
# This is a common pattern to pre-pull models during the image build.
# RUN /bin/sh -c 'ollama serve & sleep 10 && ollama pull llama3.1'
RUN /bin/sh -c 'ollama serve & sleep 10 && ollama pull granite3.2:2b'