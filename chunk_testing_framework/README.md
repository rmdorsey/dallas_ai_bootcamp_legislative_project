
# 📚 Chunk Testing Framework

A modular FastAPI-based tool to evaluate different text chunking strategies for Retrieval-Augmented Generation (RAG) and embedding-powered systems. It supports PDF or URL document sources, customizable embedding models (HuggingFace), and interprets results using OpenAI’s GPT models.

---

## 🚀 Features

- 🔍 Evaluate chunking strategies: `paragraph`, `3-sentence`, `token-100`, `plank-structured`, and more
- 📄 Accepts input as either:
  - URL (HTML content)
  - PDF (local file path)
- 🧠 Embedding model selector using HuggingFace models (e.g., `sentence-transformers/all-MiniLM-L6-v2`)
- 📈 Metrics supported:
  - `chunk_recall`
  - `answer_f1`
  - `faithfulness`
  - `execution_time`
- 📤 Upload PDFs via Swagger UI
- 🧪 Pluggable chunking functions
- 🤖 Interpretation powered by OpenAI (via GPT-4)

---

## 🏗️ Architecture

```
.
├── app
│   ├── api
│   │   └── v1
│   │       └── endpoints.py         # API routes
│   ├── core
│   │   └── logger.py                # Logging configuration
│   ├── data
│   │   └── loader.py                # URL and PDF loading
│   ├── models
│   │   └── schemas.py               # Pydantic request/response models
│   ├── services
│   │   ├── chunking.py              # Chunking logic
│   │   ├── custom_pdf_preprocessor.py  # Plank structure parser
│   │   ├── evaluation.py            # Metrics engine
│   │   ├── retrieval.py             # Embedding and similarity search
│   │   └── interpreter.py           # OpenAI/GPT integration
│   └── main.py                      # FastAPI entry point
├── temp_uploads                    # Uploaded PDFs go here
├── requirements.txt
└── README.md
```

---

## 🧪 Setup

### 1. Clone the repo

```bash
git clone https://github.com/yourname/chunk-testing-framework.git
cd chunk-testing-framework
```

### 2. Create and activate virtual environment

```bash
python -m venv env
env\Scripts\activate  # Windows
# or
source env/bin/activate  # Mac/Linux
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Set environment variables

Create a `.env` file:

```env
OPENAI_API_KEY=sk-xxxxx
```

Or set it in your shell before running the app.

---

## ▶️ Run the app

```bash
uvicorn app.main:app --reload
```

Once running, visit [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) to test the API via Swagger.

---

## 📥 Example Input (POST `/api/v1/evaluate`)

```json
{
  "dataset_source_type": "pdf",
  "dataset_source": "temp_uploads/2024-RPT-Platform.pdf",
  "embedding_model": "sentence-transformers/all-MiniLM-L6-v2",
  "test_queries": [
    "What does the party say about border security?",
    "What are the principles on healthcare?"
  ],
  "ground_truth_answers": [
    "The party supports strong border enforcement and completing the wall.",
    "The party believes in personal healthcare freedom and opposes government mandates."
  ],
  "chunk_strategies": [
    "paragraph", "3-sentence", "token-100"
  ],
  "metrics": [
    "chunk_recall", "answer_f1", "faithfulness", "execution_time"
  ]
}
```

---

## 📊 Example Output

```json
{
  "results": [
    {
      "strategy_name": "paragraph",
      "metrics": {
        "chunk_recall": 0,
        "answer_f1": 0.017,
        "faithfulness": 0,
        "execution_time": 3.119
      }
    }
  ],
  "metadata": {
    "note": "Evaluated using embedding model: sentence-transformers/all-MiniLM-L6-v2"
  }
}
```

---

## 🧠 Prompt Interpretation (POST `/api/v1/interpret`)

You can send the results and the original evaluation request to get an expert GPT-powered interpretation and recommendation of the best chunking strategy.

---

## 🧰 Tech Stack

- [FastAPI](https://fastapi.tiangolo.com)
- [Pydantic](https://docs.pydantic.dev)
- [HuggingFace Transformers](https://huggingface.co/sentence-transformers)
- [scikit-learn](https://scikit-learn.org)
- [OpenAI](https://platform.openai.com)
- [PyMuPDF (`fitz`)](https://pymupdf.readthedocs.io)

---

## ✨ To-Do / Ideas

- [ ] Add support for plain `.txt` files
- [ ] Add web-based result visualization dashboard
- [ ] Plug in local models via `llama-cpp`, `ollama`, or HuggingFace Inference API
- [ ] CI/CD with GitHub Actions

---

## 🙌 Contributors

- 👩‍💻 Angela Cortés – Project Lead, QA Engineer, Bootcamp AI Builder

---

## 📄 License

MIT
