# 🚀 LegislAItive - FastAPI Backend

**AI-Powered Legislative Analysis API** - A comprehensive FastAPI backend that provides intelligent legislative search, bill analysis, and civic engagement tools through vector embeddings and large language models.

---

## 📌 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Database Integration](#database-integration)
- [AI Integration](#ai-integration)
- [Environment Variables](#environment-variables)
- [Docker Development](#docker-development)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## 🧠 Overview

The LegislAItive FastAPI backend serves as the core intelligence layer for legislative analysis, providing:

- **Vector-based Search**: ChromaDB integration for semantic similarity matching
- **AI-Powered Analysis**: Integration with Ollama for local LLM processing
- **Legislative Data**: RESTful APIs for bill information, representatives, and civic data
- **Real-time Processing**: Async endpoints for efficient data retrieval
- **Scalable Architecture**: Microservices-ready design with containerization

---

## ✨ Features

### 🔍 Core API Features
- **Legislative Search**: Semantic search across bills and legislative documents
- **Representative Lookup**: Address-based representative identification
- **Bill Analysis**: Detailed bill parsing and analysis
- **Similarity Matching**: AI-powered document similarity scoring
- **Civic Engagement**: Tools for connecting citizens with their representatives

### 🤖 AI Integration
- **Local LLM**: Ollama integration for private, on-premise AI processing
- **Vector Embeddings**: ChromaDB for efficient semantic search
- **Document Processing**: Automated bill parsing and chunking
- **Context-Aware Responses**: Intelligent responses based on legislative context

### 🏗️ Technical Features
- **FastAPI Framework**: Modern, fast Python web framework
- **Async/Await**: Non-blocking I/O for high performance
- **Automatic Documentation**: Interactive API docs with Swagger UI
- **Type Safety**: Pydantic models for request/response validation
- **CORS Support**: Frontend integration with proper CORS handling
- **Health Checks**: Comprehensive health monitoring endpoints

---

## 🛠️ Tech Stack

### Backend Core
- **FastAPI** - Modern Python web framework
- **Python 3.9+** - Latest Python features and performance
- **Pydantic** - Data validation and settings management
- **Uvicorn** - ASGI server for production deployment

### AI & Data
- **ChromaDB** - Vector database for embeddings and similarity search
- **Ollama** - Local LLM server for AI processing
- **Sentence Transformers** - Text embedding generation
- **NumPy/Pandas** - Data processing and manipulation

### Infrastructure
- **Docker** - Containerization for consistent environments
- **Docker Compose** - Multi-service orchestration
- **Async Libraries** - httpx, aiofiles for async operations

---

## 🏛️ Architecture

### Service Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React App     │    │   FastAPI       │    │   ChromaDB      │
│   (Frontend)    │◄──►│   (Backend)     │◄──►│   (Vector DB)   │
│   Port: 8050    │    │   Port: 8000    │    │   Port: 8001    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │     Ollama      │
                       │   (Local LLM)   │
                       │  Port: 11434    │
                       └─────────────────┘
```

### Data Flow
1. **User Query** → React Frontend
2. **API Request** → FastAPI Backend
3. **Vector Search** → ChromaDB for similarity matching
4. **AI Processing** → Ollama for intelligent responses
5. **Response** → Back to Frontend via FastAPI

---

## 🗂️ Project Structure

```
fastapi-app/
├── app/
│   ├── api/                    # API route definitions
│   │   ├── __init__.py
│   │   ├── endpoints/          # API endpoints
│   │   │   ├── __init__.py
│   │   │   ├── bills.py        # Bill-related endpoints
│   │   │   ├── representatives.py # Representative lookup
│   │   │   ├── search.py       # Search endpoints
│   │   │   └── health.py       # Health check endpoints
│   │   └── deps.py             # Dependency injection
│   ├── core/                   # Core configuration
│   │   ├── __init__.py
│   │   ├── config.py           # App configuration
│   │   ├── security.py         # Security utilities
│   │   └── logging.py          # Logging configuration
│   ├── models/                 # Pydantic models
│   │   ├── __init__.py
│   │   ├── bill.py             # Bill data models
│   │   ├── representative.py   # Representative models
│   │   └── search.py           # Search models
│   ├── services/               # Business logic
│   │   ├── __init__.py
│   │   ├── chroma_service.py   # ChromaDB integration
│   │   ├── ollama_service.py   # Ollama LLM integration
│   │   ├── bill_service.py     # Bill processing
│   │   └── representative_service.py # Representative lookup
│   ├── utils/                  # Utility functions
│   │   ├── __init__.py
│   │   ├── text_processing.py  # Text processing utilities
│   │   └── embeddings.py       # Embedding generation
│   └── main.py                 # FastAPI application entry point
├── tests/                      # Test suite
│   ├── __init__.py
│   ├── test_api/               # API tests
│   ├── test_services/          # Service tests
│   └── conftest.py             # Test configuration
├── data/                       # Data files
│   ├── bills/                  # Legislative bill data
│   ├── representatives/        # Representative data
│   └── embeddings/             # Pre-computed embeddings
├── scripts/                    # Utility scripts
│   ├── data_ingestion.py       # Data loading scripts
│   └── setup_db.py             # Database setup
├── requirements.txt            # Python dependencies
├── Dockerfile                  # Production Docker image
├── Dockerfile.dev              # Development Docker image
└── README.md                   # This file
```

---

## 🚀 Getting Started

### Prerequisites
- Python 3.9+
- Docker & Docker Compose
- Git

### 1. Clone Repository

```bash
git clone <repository-url>
cd fastapi-app
```

### 2. Environment Setup

Create `.env` file:
```env
# Application
APP_NAME=LegislAItive API
APP_VERSION=1.0.0
DEBUG=true
ENVIRONMENT=development

# Database
CHROMA_HOST=chromadb
CHROMA_PORT=8000
CHROMA_PERSIST_DIR=/chroma/chroma

# AI Services
OLLAMA_HOST=ollama
OLLAMA_PORT=11434
OLLAMA_MODEL=llama2

# API Configuration
API_V1_STR=/api/v1
CORS_ORIGINS=["http://localhost:3000", "http://localhost:8050"]

# Security
SECRET_KEY=your-secret-key-here
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### 3. Docker Development

```bash
# Start all services
docker-compose up

# Or start only backend services
docker-compose up fastapi chromadb ollama
```

### 4. Local Development

```bash
# Install dependencies
pip install -r requirements.txt

# Start development server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 5. Access API

- **API Documentation**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **Alternative Docs**: [http://localhost:8000/redoc](http://localhost:8000/redoc)
- **Health Check**: [http://localhost:8000/healthz](http://localhost:8000/healthz)

---

## 🛣️ API Endpoints

### Core Endpoints

#### Health & Status
```http
GET /healthz                    # Health check
GET /api/v1/status             # Service status
```

#### Legislative Search
```http
POST /api/v1/search/bills      # Search bills by query
GET /api/v1/bills/{bill_id}    # Get specific bill
POST /api/v1/bills/analyze     # Analyze bill content
POST /api/v1/search/similarity # Find similar bills
```

#### Representatives
```http
POST /api/v1/representatives/lookup    # Find by address
GET /api/v1/representatives/{rep_id}   # Get representative info
```

#### AI Integration
```http
POST /api/v1/ai/chat          # Chat with AI about legislation
POST /api/v1/ai/summarize     # Summarize bill content
POST /api/v1/ai/analyze       # Analyze legislation
```

### Example API Calls

#### Search Bills
```bash
curl -X POST "http://localhost:8000/api/v1/search/bills" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "taxpayer funded lobbying",
    "limit": 10,
    "similarity_threshold": 0.7
  }'
```

#### Lookup Representative
```bash
curl -X POST "http://localhost:8000/api/v1/representatives/lookup" \
  -H "Content-Type: application/json" \
  -d '{
    "address": "123 Main St, Austin, TX 78701"
  }'
```

---

## 🗄️ Database Integration

### ChromaDB Configuration
```python
# Example ChromaDB setup
from chromadb import Client
from chromadb.config import Settings

client = Client(Settings(
    chroma_db_impl="duckdb+parquet",
    persist_directory="/chroma/chroma"
))

# Create collection for bills
bills_collection = client.create_collection(
    name="bills",
    metadata={"description": "Legislative bills with embeddings"}
)
```

### Data Ingestion
```python
# Example bill ingestion
def ingest_bill_data(bill_text: str, metadata: dict):
    # Generate embeddings
    embeddings = generate_embeddings(bill_text)
    
    # Store in ChromaDB
    bills_collection.add(
        documents=[bill_text],
        embeddings=[embeddings],
        metadatas=[metadata],
        ids=[metadata["bill_id"]]
    )
```

---

## 🤖 AI Integration

### Ollama Configuration
```python
# Example Ollama integration
import httpx

class OllamaService:
    def __init__(self, host: str = "ollama", port: int = 11434):
        self.base_url = f"http://{host}:{port}"
    
    async def generate_response(self, prompt: str, model: str = "llama2"):
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/api/generate",
                json={
                    "model": model,
                    "prompt": prompt,
                    "stream": False
                }
            )
            return response.json()
```

### Embedding Generation
```python
# Example embedding service
from sentence_transformers import SentenceTransformer

class EmbeddingService:
    def __init__(self, model_name: str = "all-MiniLM-L6-v2"):
        self.model = SentenceTransformer(model_name)
    
    def generate_embeddings(self, text: str) -> list:
        embeddings = self.model.encode([text])
        return embeddings[0].tolist()
```

---

## 🔧 Environment Variables

### Required Variables
```env
# Core Application
APP_NAME=LegislAItive API
DEBUG=true
ENVIRONMENT=development

# Database Connections
CHROMA_HOST=chromadb
CHROMA_PORT=8000
OLLAMA_HOST=ollama
OLLAMA_PORT=11434

# Security
SECRET_KEY=your-secret-key-here
CORS_ORIGINS=["http://localhost:8050"]

# AI Configuration
DEFAULT_LLM_MODEL=llama2
EMBEDDING_MODEL=all-MiniLM-L6-v2
MAX_TOKENS=2048
TEMPERATURE=0.7
```

### Optional Variables
```env
# Performance
WORKERS=4
MAX_CONNECTIONS=100
TIMEOUT=30

# Logging
LOG_LEVEL=info
LOG_FORMAT=json

# Feature Flags
ENABLE_CACHING=true
ENABLE_RATE_LIMITING=true
ENABLE_METRICS=true
```

---

## 🐳 Docker Development

### Development Container
```dockerfile
# Dockerfile.dev
FROM python:3.9-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy source code
COPY . .

# Expose port
EXPOSE 8000

# Development command with hot reload
CMD ["uvicorn", "app.main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]
```

### Docker Compose Integration
```yaml
# Key FastAPI service configuration
fastapi:
  build:
    context: .
    dockerfile: fastapi-app/Dockerfile.dev
  container_name: fastapi
  ports:
    - "8000:8000"
  volumes:
    - ./fastapi-app:/app
    - ./shared:/app/shared
  environment:
    - CHROMA_HOST=chromadb
    - OLLAMA_HOST=ollama
  depends_on:
    - chromadb
    - ollama
  healthcheck:
    test: ["CMD", "curl", "-f", "http://localhost:8000/healthz"]
    interval: 10s
    timeout: 5s
    retries: 5
```

---

## 🚀 Production Deployment

### Build Production Image
```bash
# Build production container
docker build -f Dockerfile -t legislative-api:latest .

# Run production container
docker run -d \
  -p 8000:8000 \
  -e ENVIRONMENT=production \
  -e DEBUG=false \
  legislative-api:latest
```

### Deployment Options

**Container Orchestration**
- Docker Swarm
- Kubernetes
- AWS ECS
- Google Cloud Run

**Server Deployment**
- Nginx reverse proxy
- Gunicorn with Uvicorn workers
- AWS Application Load Balancer
- Cloudflare for CDN and security

### Production Configuration
```python
# app/core/config.py
from pydantic import BaseSettings

class Settings(BaseSettings):
    app_name: str = "LegislAItive API"
    environment: str = "production"
    debug: bool = False
    
    # Database
    chroma_host: str = "chromadb"
    chroma_port: int = 8000
    
    # AI Services
    ollama_host: str = "ollama"
    ollama_port: int = 11434
    
    # Security
    secret_key: str
    cors_origins: list = ["https://legislative.example.com"]
    
    class Config:
        env_file = ".env"
```

---

## 🧪 Testing

### Run Tests
```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=app tests/

# Run specific test file
pytest tests/test_api/test_bills.py

# Run tests in Docker
docker-compose exec fastapi pytest
```

### Test Structure
```python
# Example test
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/healthz")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_search_bills():
    response = client.post(
        "/api/v1/search/bills",
        json={"query": "healthcare", "limit": 5}
    )
    assert response.status_code == 200
    assert len(response.json()["results"]) <= 5
```

---

## 📊 Monitoring & Logging

### Health Checks
```python
# app/api/endpoints/health.py
from fastapi import APIRouter, Depends
from app.services.chroma_service import ChromaService
from app.services.ollama_service import OllamaService

router = APIRouter()

@router.get("/healthz")
async def health_check():
    # Check database connectivity
    chroma_healthy = await check_chroma_health()
    ollama_healthy = await check_ollama_health()
    
    return {
        "status": "healthy" if chroma_healthy and ollama_healthy else "unhealthy",
        "services": {
            "chroma": chroma_healthy,
            "ollama": ollama_healthy
        }
    }
```

### Logging Configuration
```python
# app/core/logging.py
import logging
from pythonjsonlogger import jsonlogger

def setup_logging():
    logHandler = logging.StreamHandler()
    formatter = jsonlogger.JsonFormatter()
    logHandler.setFormatter(formatter)
    logger = logging.getLogger()
    logger.addHandler(logHandler)
    logger.setLevel(logging.INFO)
```

---

## 🤝 Contributing

### Development Setup
1. **Fork** the repository
2. **Create** feature branch: `git checkout -b feature/amazing-feature`
3. **Install** dependencies: `pip install -r requirements.txt`
4. **Run** tests: `pytest`
5. **Commit** changes: `git commit -m 'Add amazing feature'`
6. **Push** to branch: `git push origin feature/amazing-feature`
7. **Open** Pull Request

### Code Standards
- **PEP 8** compliance for Python code
- **Type hints** for all function signatures
- **Docstrings** for all public functions
- **Async/await** for I/O operations
- **Pydantic models** for data validation

### Pull Request Guidelines
- Include tests for new functionality
- Update documentation as needed
- Ensure CI/CD pipeline passes
- Follow semantic versioning

---

## 📚 Additional Resources

### Documentation
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [ChromaDB Documentation](https://docs.trychroma.com/)
- [Ollama Documentation](https://ollama.ai/docs)
- [Pydantic Documentation](https://pydantic-docs.helpmanual.io/)

### Related Projects
- **Frontend**: React 19 + Vite application
- **Database**: ChromaDB for vector storage
- **AI**: Ollama for local LLM processing
- **Infrastructure**: Docker containerization

---

## 🎯 Roadmap

### Current Features
- ✅ Basic API structure
- ✅ ChromaDB integration
- ✅ Ollama LLM integration
- ✅ Docker containerization
- ✅ Health monitoring

### Upcoming Features
- 🔄 Advanced search algorithms
- 🔄 Caching layer implementation
- 🔄 Rate limiting and security
- 🔄 Metrics and monitoring
- 🔄 Multi-model AI support

### Future Enhancements
- 📝 GraphQL API support
- 📝 Real-time WebSocket connections
- 📝 Advanced analytics
- 📝 Mobile API optimizations
- 📝 Multi-language support

---

> **"Legislation Made Legible"** - Designed to make legislative information accessible, understandable, and actionable for every citizen.


