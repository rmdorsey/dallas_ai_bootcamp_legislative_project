# chunk_testing_framework/Dockerfile
# Use a slim Python image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies if needed (uncomment if needed later)
# RUN apt-get update && apt-get install -y build-essential curl

# Copy requirements and install them
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code into the container
COPY . .

# Copy shared config from root (adjust if needed in docker-compose)
#COPY ../shared/config.py ./shared/config.py

# Add shared/ to PYTHONPATH to allow `import shared.config`
ENV PYTHONPATH="/app:/app/shared:$PYTHONPATH"

# Run FastAPI app with Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8002", "--reload"]