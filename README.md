# 🏛️ LegislAItive: Legislative Bill Analysis AI

A project built during the Dallas AI Bootcamp 2025 to analyze and predict legislative bill approval using Retrieval-Augmented Generation (RAG), embeddings, and AI agents. It empowers activists, lobbyists, and civic tech users by enabling searchable access to legislative content, political platforms, and lawmaking processes in Texas.

---

## 📌 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Embedding Pipelines](#embedding-pipelines)
- [Running the API](#running-the-api)
- [Testing](#testing)
- [Good Practices](#good-practices)
- [Team](#team)
- [License](#license)

---

## 🧠 Overview

This AI product predicts whether a Texas legislative bill will be approved based on its content, sponsors, and alignment with party platforms. It also supports semantic search over:

- Texas Democratic and Republican Platforms
- Legislative bills and summaries
- Legislative process documentation
- Activist and interest group data (upcoming)

---

## ✨ Features

- 🔍 **Semantic Search** over political platforms using ChromaDB
- 🧠 **LLM Integration** to summarize bills and match user queries
- 🧾 **PDF parsing + chunking** by sections, paragraphs, or token size
- 📊 **Similarity scoring** and traceable chunks with metadata
- ⚙️ **Modular FastAPI backend** with well-separated concerns
- 🧪 **Testing suite** for chunking, accuracy, and retrieval evaluation

---

## 🏗️ Architecture

```text
User → FastAPI → ChromaDB → Precomputed Embeddings (Dem/Rep Platform, Bills)
                       ↓
               Agent/LLM (Gemini/GPT) for answer synthesis
```

---

## 🚀 Technologies

| Tool | Purpose |
|------|---------|
| **FastAPI** | Backend API framework |
| **ChromaDB** | Local vector database for embeddings |
| **SentenceTransformers** | For embedding generation |
| **Docker + Compose** | Containerization and orchestration |
| **Uvicorn** | ASGI server for FastAPI |
| **pytest** | Unit and integration testing |
| **BeautifulSoup / PyPDF2** | Scraping and PDF parsing |

---

## ⚙️ Getting Started

### Clone the repository

```bash
git clone https://github.com/<your-org>/dallas_ai_bootcamp_legislative_project.git
cd dallas_ai_bootcamp_legislative_project
```

### Set up with Docker Compose

```bash
docker compose up --build
```

### Access the API

- Swagger Docs: [http://localhost:8000/docs](http://localhost:8000/docs)
- Healthcheck: `GET /`

---

## 📚 Embedding Pipelines

> Located in: `seeds/chromadb/`

| Document Source | Script | Strategy |
|-----------------|--------|----------|
| Texas Democratic Platform | `dem_platform_embedding.py` | Fixed-size chunking + section-based test |
| Texas Republican Platform | `rep_platform_seed.py` | PDF parsing + section metadata |
| Legislative Bills (future) | `legislative-bill-seeding.py` | PDF extraction + metadata embedding |

To re-run embeddings:

```bash
python dem_platform_embedding.py
```

To insert into ChromaDB:

```bash
python insert_into_chromadb.py
```

---

## 🔌 Running the API

> Located in: `fastapi-app/`

To run locally without Docker:

```bash
cd fastapi-app
uvicorn main:app --reload
```

Make sure your `PYTHONPATH` includes `/app` for module imports.

---

## ✅ Testing



---

## 🧭 Good Practices

- 📦 Use **absolute imports** and declare `PYTHONPATH=/app` in Docker
- 🧱 Keep **chunking strategy** modular and test-driven
- 📝 Document **expected answers** for QA in a gold-standard file
- 🧪 Evaluate **similarity scores** with context (higher ≠ always better)
- 📁 Organize endpoints, services, and models in separate folders
- 🔒 Avoid hardcoding sensitive paths; use `config.py`
- 💬 Log errors and unhandled queries for continuous improvement

---

## 👥 Team

- **Matt Dorsey** – Project Lead, Developer - https://www.linkedin.com/in/rmdorsey/
- **Angela Cortes** –  QA Engineer, Developer - https://www.linkedin.com/in/angela-cortes-pabon/
- **Akshanth** – Full Stack Developer- https://www.linkedin.com/in/akshanthm/
- **Anil Pantangi** – Mentor Support (AI Bootcamp) - https://www.linkedin.com/in/anilkpantangi/

---

## 📄 License



---

> "Legislation Made Legible" – A project to empower civic engagement through AI and data-driven insights.
