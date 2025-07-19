# 🌱 Seeds - Legislative Data Embedding & Seeding

**Data Foundation for Legislative Analysis** - A comprehensive Python-based data processing pipeline that handles embedding generation, data seeding, and preparation for the LegislAItive AI system. This subproject is responsible for transforming raw legislative data into searchable, AI-ready formats.

---

## 📌 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Subprojects](#subprojects)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Data Processing Pipeline](#data-processing-pipeline)
- [Embedding Generation](#embedding-generation)
- [Database Seeding](#database-seeding)
- [Configuration](#configuration)
- [Usage Examples](#usage-examples)
- [Monitoring & Logging](#monitoring--logging)
- [Contributing](#contributing)

---

## 🧠 Overview

The Seeds subproject serves as the data foundation for the LegislAItive system by:

- **Processing Legislative Bills**: Converting raw legislative documents into structured, searchable data
- **Generating Embeddings**: Creating vector representations of documents for semantic search
- **Platform Analysis**: Processing Democratic and Republican party platforms for political context
- **Database Seeding**: Populating ChromaDB with processed data and embeddings
- **Data Validation**: Ensuring data quality and consistency across all sources

This system transforms unstructured legislative and political data into a format that enables AI-powered analysis, similarity matching, and intelligent search capabilities.

---

## 🏗️ Architecture

### Data Processing Flow
```
Raw Data Sources
       ↓
┌─────────────────────────────────────────────────────┐
│                Seeds Pipeline                        │
│                                                     │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────────┐
│  │  Democratic     │  │  Legislative    │  │  Republican      │
│  │  Platform       │  │  Bill           │  │  Platform        │
│  │  Embedding      │  │  Seeding        │  │  Seed            │
│  └─────────────────┘  └─────────────────┘  └──────────────────┘
│           │                    │                    │
│           └────────────────────┼────────────────────┘
│                               │
│                    ┌─────────────────┐
│                    │  Embedding      │
│                    │  Generation     │
│                    │  Service        │
│                    └─────────────────┘
└─────────────────────────────────────────────────────┘
       ↓
┌─────────────────────────────────────────────────────┐
│                ChromaDB                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │   Bills     │  │ Democratic  │  │ Republican  │  │
│  │ Collection  │  │ Platform    │  │ Platform    │  │
│  │             │  │ Collection  │  │ Collection  │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  │
└─────────────────────────────────────────────────────┘
       ↓
┌─────────────────────────────────────────────────────┐
│            LegislAItive API                         │
│         (FastAPI + AI Services)                     │
└─────────────────────────────────────────────────────┘
```

### Integration Points
- **Input**: Raw legislative documents, party platforms, bill texts
- **Processing**: Text chunking, embedding generation, metadata extraction
- **Output**: Structured data in ChromaDB ready for semantic search
- **Integration**: Seamless connection with FastAPI backend for real-time queries

---

## 🎯 Subprojects

### 1. 📘 Democratic Platform Embedding (`dem-platform-embedding/`)
Processes Democratic Party platform documents and generates embeddings for political context analysis.

**Key Features:**
- Platform document parsing and chunking
- Policy position extraction
- Embedding generation for platform sections
- Metadata preservation (year, section, topic)

**Use Cases:**
- Analyzing bill alignment with Democratic positions
- Understanding policy context and priorities
- Comparative political analysis

### 2. 📜 Legislative Bill Seeding (`legislative-bill-seeding/`)
Core pipeline for processing legislative bills, extracting metadata, and preparing data for analysis.

**Key Features:**
- Bill text parsing and section extraction
- Metadata extraction (sponsors, committees, dates)
- Content chunking for optimal embedding
- Status tracking and versioning

**Use Cases:**
- Populating the main bills database
- Enabling semantic search across legislation
- Supporting bill comparison and analysis

### 3. 📕 Republican Platform Seed (`repub-platform-seed/`)
Processes Republican Party platform documents for comprehensive political context.

**Key Features:**
- Platform document processing
- Conservative policy position extraction
- Embedding generation for platform content
- Cross-reference with legislative content

**Use Cases:**
- Bipartisan analysis of legislation
- Understanding conservative policy perspectives
- Political alignment assessment

---

## 🛠️ Tech Stack

### Core Technologies
- **Python 3.9+** - Primary programming language
- **ChromaDB** - Vector database for embeddings storage
- **Sentence Transformers** - Embedding model for text vectorization
- **Pandas** - Data manipulation and analysis
- **NumPy** - Numerical computations

### NLP & AI Libraries
- **transformers** - Hugging Face transformers for NLP
- **spaCy** - Advanced natural language processing
- **nltk** - Natural language toolkit
- **sentence-transformers** - Semantic similarity models

### Data Processing
- **PyPDF2/pdfplumber** - PDF document processing
- **BeautifulSoup** - HTML/XML parsing
- **requests** - HTTP requests for data fetching
- **python-docx** - Word document processing

### Infrastructure
- **Docker** - Containerization for consistent environments
- **python-dotenv** - Environment variable management
- **loguru** - Advanced logging capabilities
- **pydantic** - Data validation and settings

---

## 🗂️ Project Structure

```
seeds/
├── dem-platform-embedding/          # Democratic platform processing
│   ├── src/
│   │   ├── __init__.py
│   │   ├── main.py                  # Main processing script
│   │   ├── parsers/                 # Document parsers
│   │   │   ├── __init__.py
│   │   │   ├── platform_parser.py   # Platform document parser
│   │   │   └── text_processor.py    # Text processing utilities
│   │   ├── embeddings/              # Embedding generation
│   │   │   ├── __init__.py
│   │   │   ├── embedding_service.py # Embedding generation service
│   │   │   └── model_manager.py     # Model management
│   │   ├── database/                # Database operations
│   │   │   ├── __init__.py
│   │   │   ├── chroma_client.py     # ChromaDB client
│   │   │   └── seeder.py            # Data seeding logic
│   │   └── utils/                   # Utility functions
│   │       ├── __init__.py
│   │       ├── config.py            # Configuration management
│   │       └── logging.py           # Logging setup
│   ├── data/                        # Raw data files
│   │   ├── raw/                     # Raw platform documents
│   │   ├── processed/               # Processed data
│   │   └── outputs/                 # Generated outputs
│   ├── tests/                       # Test files
│   ├── requirements.txt             # Python dependencies
│   ├── Dockerfile                   # Docker configuration
│   └── README.md                    # Subproject documentation
├── legislative-bill-seeding/        # Legislative bill processing
│   ├── src/
│   │   ├── __init__.py
│   │   ├── main.py                  # Main seeding script
│   │   ├── parsers/                 # Bill parsers
│   │   │   ├── __init__.py
│   │   │   ├── bill_parser.py       # Bill document parser
│   │   │   ├── metadata_extractor.py # Metadata extraction
│   │   │   └── section_parser.py    # Section parsing
│   │   ├── processors/              # Data processing
│   │   │   ├── __init__.py
│   │   │   ├── text_chunker.py      # Text chunking logic
│   │   │   ├── embeddings_generator.py # Embedding generation
│   │   │   └── quality_checker.py   # Data quality validation
│   │   ├── database/                # Database operations
│   │   │   ├── __init__.py
│   │   │   ├── chroma_manager.py    # ChromaDB management
│   │   │   └── collection_builder.py # Collection building
│   │   └── utils/                   # Utilities
│   │       ├── __init__.py
│   │       ├── file_utils.py        # File operations
│   │       └── text_utils.py        # Text processing utilities
│   ├── data/                        # Legislative data
│   │   ├── bills/                   # Bill documents
│   │   ├── metadata/                # Bill metadata
│   │   └── processed/               # Processed bills
│   ├── tests/                       # Test files
│   ├── requirements.txt             # Dependencies
│   ├── Dockerfile                   # Docker configuration
│   └── README.md                    # Documentation
├── repub-platform-seed/             # Republican platform processing
│   ├── src/
│   │   ├── __init__.py
│   │   ├── main.py                  # Main processing script
│   │   ├── parsers/                 # Platform parsers
│   │   │   ├── __init__.py
│   │   │   ├── platform_parser.py   # Platform document parser
│   │   │   └── content_extractor.py # Content extraction
│   │   ├── embeddings/              # Embedding services
│   │   │   ├── __init__.py
│   │   │   ├── embedding_pipeline.py # Embedding pipeline
│   │   │   └── vector_store.py      # Vector storage
│   │   ├── database/                # Database operations
│   │   │   ├── __init__.py
│   │   │   └── seeding_service.py   # Seeding service
│   │   └── utils/                   # Utility functions
│   │       ├── __init__.py
│   │       └── helpers.py           # Helper functions
│   ├── data/                        # Platform data
│   │   ├── raw/                     # Raw platform documents
│   │   └── processed/               # Processed data
│   ├── tests/                       # Test files
│   ├── requirements.txt             # Dependencies
│   ├── Dockerfile                   # Docker configuration
│   └── README.md                    # Documentation
├── shared/                          # Shared utilities
│   ├── __init__.py
│   ├── common/                      # Common utilities
│   │   ├── __init__.py
│   │   ├── base_parser.py           # Base parser class
│   │   ├── embedding_base.py        # Base embedding service
│   │   └── database_base.py         # Base database operations
│   ├── config/                      # Shared configuration
│   │   ├── __init__.py
│   │   ├── settings.py              # Global settings
│   │   └── models.py                # Pydantic models
│   └── utils/                       # Shared utilities
│       ├── __init__.py
│       ├── text_processing.py       # Text processing utilities
│       └── validation.py            # Data validation
├── scripts/                         # Utility scripts
│   ├── run_all_seeds.py             # Run all seeding processes
│   ├── validate_data.py             # Data validation script
│   ├── cleanup_db.py                # Database cleanup
│   └── health_check.py              # Health monitoring
├── tests/                           # Integration tests
│   ├── __init__.py
│   ├── test_integration.py          # Integration tests
│   └── test_pipeline.py             # Pipeline tests
├── docker-compose.yml               # Docker compose for seeds
├── requirements.txt                 # Common dependencies
├── Dockerfile                       # Multi-stage Docker build
└── README.md                        # This file
```

---

## 🚀 Getting Started

### Prerequisites
- Python 3.9+
- Docker & Docker Compose
- ChromaDB instance
- Sufficient storage for document processing

### 1. Clone and Setup

```bash
git clone <repository-url>
cd seeds
```

### 2. Environment Configuration

Create `.env` file:
```env
# Database Configuration
CHROMA_HOST=localhost
CHROMA_PORT=8001
CHROMA_PERSIST_DIR=./chroma_data

# Embedding Configuration
EMBEDDING_MODEL=all-MiniLM-L6-v2
EMBEDDING_DEVICE=cpu
BATCH_SIZE=32

# Processing Configuration
CHUNK_SIZE=512
CHUNK_OVERLAP=50
MAX_WORKERS=4

# Logging
LOG_LEVEL=INFO
LOG_FILE=seeds.log

# Data Paths
DATA_DIR=./data
OUTPUT_DIR=./outputs
```

### 3. Install Dependencies

```bash
# Install common dependencies
pip install -r requirements.txt

# Install subproject dependencies
pip install -r dem-platform-embedding/requirements.txt
pip install -r legislative-bill-seeding/requirements.txt
pip install -r repub-platform-seed/requirements.txt
```

### 4. Run Individual Subprojects

```bash
# Run Democratic platform embedding
cd dem-platform-embedding
python src/main.py

# Run legislative bill seeding
cd legislative-bill-seeding
python src/main.py

# Run Republican platform seeding
cd repub-platform-seed
python src/main.py
```

### 5. Run Complete Pipeline

```bash
# Run all seeding processes
python scripts/run_all_seeds.py

# Validate processed data
python scripts/validate_data.py
```

---

## 🔄 Data Processing Pipeline


---

## 🎯 Embedding Generation


---

## ⚙️ Configuration

---

## 📊 Monitoring & Logging


---

## 🤝 Contributing

### Development Guidelines
1. **Fork** the repository
2. **Create** feature branch: `git checkout -b feature/new-seeding-logic`
3. **Implement** changes with tests
4. **Run** tests: `pytest tests/`
5. **Update** documentation
6. **Commit**: `git commit -m 'Add new seeding logic'`
7. **Push**: `git push origin feature/new-seeding-logic`
8. **Create** Pull Request

### Code Standards
- **PEP 8** compliance
- **Type hints** for all functions
- **Docstrings** for public methods
- **Unit tests** for new functionality
- **Integration tests** for pipeline changes

### Adding New Subprojects
1. Create new directory following naming convention
2. Implement required interfaces from `shared/common/`
3. Add configuration in `shared/config/`
4. Update main pipeline in `scripts/run_all_seeds.py`
5. Add documentation and tests

---

## 📚 Resources

### Documentation
- [ChromaDB Documentation](https://docs.trychroma.com/)
- [Sentence Transformers](https://www.sbert.net/)
- [Hugging Face Transformers](https://huggingface.co/docs/transformers/)
- [Pydantic Documentation](https://pydantic-docs.helpmanual.io/)

### Related Projects
- **FastAPI Backend**: API layer consuming the seeded data
- **React Frontend**: User interface for legislative analysis
- **ChromaDB**: Vector database for semantic search

---

## 🎯 Roadmap

### Current Features
- ✅ Democratic platform embedding
- ✅ Legislative bill seeding
- ✅ Republican platform seeding
- ✅ ChromaDB integration
- ✅ Docker containerization

### Upcoming Features
- 🔄 Incremental data updates
- 🔄 Real-time processing pipeline
- 🔄 Advanced metadata extraction
- 🔄 Multi-language support
- 🔄 Quality scoring system

### Future Enhancements
- 📝 Automated data source monitoring
- 📝 ML-based data quality assessment
- 📝 Distributed processing
- 📝 Advanced embedding models
- 📝 Data versioning system

---

> **"Building the Foundation for Democratic Engagement"** - Transforming raw legislative data into actionable intelligence for informed civic participation.

