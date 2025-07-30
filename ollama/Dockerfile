# Start from the official Ollama base image
FROM ollama/ollama:latest

# Copy the custom entrypoint script from our project into the container's root directory.
COPY ./ollama/entrypoint.sh /entrypoint.sh

# Make the script executable within the container.
RUN chmod +x /entrypoint.sh

# Set the entrypoint for the container. This script will now run every
# time the container starts.
ENTRYPOINT ["/entrypoint.sh"]