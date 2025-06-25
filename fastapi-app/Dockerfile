# fastapi-app/Dockerfile  
FROM python:3.11-slim

WORKDIR /app

# 1) Copy only requirements and install deps
COPY fastapi-app/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# 2) Copy application code
COPY fastapi-app/ /app

# 3) Copy shared config
RUN mkdir -p /app/shared
COPY shared/config.py /app/shared/config.py

# 4) (Optional) create a non-root user
# RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser
# USER appuser

# Make config.py importable as shared.config
ENV PYTHONPATH="${PYTHONPATH}:/app"

CMD ["uvicorn","main:app","--host","0.0.0.0","--port","8000"]