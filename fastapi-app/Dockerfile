# Place this file at: fastapi-app/Dockerfile

# 1. Base Image: Use a specific, slim, and secure Python base image.
FROM python:3.11-slim

# 2. Environment Variables: Set recommended environment variables for Python in Docker.
#    - PYTHONUNBUFFERED: Ensures logs are sent straight to the terminal without buffering.
#    - PYTHONDONTWRITEBYTECODE: Prevents Python from creating .pyc files.
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# 3. Working Directory: Set the default directory for all subsequent commands.
WORKDIR /app

# 4. System Dependencies: Install curl, which is needed for your healthcheck.
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# 5. Install Python Dependencies: Copy only the requirements file first to leverage Docker's caching.
#    This layer only gets rebuilt if requirements.txt changes.
COPY fastapi-app/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 6. Copy Application Code: Copy the rest of your application's source code.
#    The '.' copies the *contents* of fastapi-app/ into the WORKDIR (/app).
COPY fastapi-app/ .

# 7. Run Command: The command to start your Uvicorn server.
#    Note: Your docker-compose.yml file correctly overrides this with a --reload
#    command for development, which is the perfect setup.
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]