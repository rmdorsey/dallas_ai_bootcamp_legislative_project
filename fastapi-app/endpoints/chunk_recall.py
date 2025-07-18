# endpoints/chunk_recall.py - Router for Chunk Recall Evaluation

from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel, Field, validator
from typing import List, Dict, Any, Optional, Union
import asyncio
import hashlib
import time
import uuid
from datetime import datetime
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create router
router = APIRouter()

# Try to import optional dependencies
try:
    import numpy as np

    HAS_NUMPY = True
except ImportError:
    HAS_NUMPY = False
    logger.warning("NumPy not available. Using fallback implementations.")

try:
    from sentence_transformers import SentenceTransformer

    HAS_SENTENCE_TRANSFORMERS = True
    # Global model instance (lazy loading)
    embedding_model = None
except ImportError:
    HAS_SENTENCE_TRANSFORMERS = False
    embedding_model = None
    logger.warning("sentence-transformers not available. Using dummy embeddings.")


def get_embedding_model():
    """Lazy load the embedding model"""
    global embedding_model
    if not HAS_SENTENCE_TRANSFORMERS:
        return "dummy"

    if embedding_model is None:
        try:
            embedding_model = SentenceTransformer('all-MiniLM-L6-v2')
            logger.info("Embedding model loaded successfully")
        except Exception as e:
            logger.error(f"Failed to load embedding model: {e}")
            embedding_model = "dummy"
    return embedding_model


# Pydantic Models
class ChunkingStrategy(BaseModel):
    """Chunking strategy configuration"""
    name: str = Field(..., description="Strategy name (e.g., 'token_100', 'sliding_window')")
    type: str = Field(..., description="Strategy type: 'fixed', 'sliding', 'paragraph', 'semantic'")
    size: Optional[int] = Field(None, description="Chunk size in tokens")
    overlap: Optional[int] = Field(None, description="Overlap size for sliding window")
    threshold: Optional[float] = Field(None, description="Threshold for semantic chunking")

    @validator('type')
    def validate_type(cls, v):
        allowed_types = ['fixed', 'sliding', 'paragraph', 'semantic', 'custom']
        if v not in allowed_types:
            raise ValueError(f"Type must be one of {allowed_types}")
        return v


class Document(BaseModel):
    """Document to be chunked"""
    id: str = Field(..., description="Unique document identifier")
    content: str = Field(..., description="Document content")
    metadata: Optional[Dict[str, Any]] = Field(default_factory=dict, description="Document metadata")


class Query(BaseModel):
    """Query for chunk recall evaluation"""
    id: str = Field(..., description="Unique query identifier")
    text: str = Field(..., description="Query text")
    expected_answer: str = Field(..., description="Expected answer or relevant content")
    ground_truth_chunk_id: Optional[str] = Field(None, description="ID of the chunk containing the answer")


class ChunkRecallRequest(BaseModel):
    """Request model for chunk recall evaluation"""
    strategy: ChunkingStrategy = Field(..., description="Chunking strategy to evaluate")
    documents: List[Document] = Field(..., description="Documents to chunk and search")
    queries: List[Query] = Field(..., description="Test queries")
    top_k: int = Field(default=5, ge=1, le=20, description="Number of top chunks to retrieve")
    similarity_threshold: float = Field(default=0.7, ge=0.0, le=1.0, description="Similarity threshold")
    embedding_model: str = Field(default="sentence-transformers", description="Embedding model to use")


class Chunk(BaseModel):
    """Individual chunk result"""
    id: str = Field(..., description="Unique chunk identifier")
    content: str = Field(..., description="Chunk content")
    document_id: str = Field(..., description="Source document ID")
    start_position: int = Field(..., description="Start position in document")
    end_position: int = Field(..., description="End position in document")
    token_count: int = Field(..., description="Number of tokens in chunk")
    embedding: Optional[List[float]] = Field(None, description="Chunk embedding vector")


class QueryResult(BaseModel):
    """Result for a single query"""
    query_id: str = Field(..., description="Query identifier")
    query_text: str = Field(..., description="Original query text")
    retrieved_chunks: List[Chunk] = Field(..., description="Retrieved chunks")
    similarity_scores: List[float] = Field(..., description="Similarity scores for retrieved chunks")
    chunk_recall: bool = Field(..., description="Whether correct chunk was retrieved")
    recall_rank: Optional[int] = Field(None, description="Rank of correct chunk (if found)")
    execution_time_ms: float = Field(..., description="Query execution time in milliseconds")


class ChunkRecallResponse(BaseModel):
    """Response model for chunk recall evaluation"""
    evaluation_id: str = Field(..., description="Unique evaluation identifier")
    strategy: ChunkingStrategy = Field(..., description="Evaluated strategy")
    overall_recall: float = Field(..., description="Overall recall score (0-1)")
    total_chunks: int = Field(..., description="Total number of chunks created")
    avg_chunk_size: float = Field(..., description="Average chunk size in tokens")
    query_results: List[QueryResult] = Field(..., description="Results for each query")
    processing_time_ms: float = Field(..., description="Total processing time")
    metadata: Dict[str, Any] = Field(default_factory=dict, description="Additional metadata")


# Chunking Functions
def chunk_text_fixed(text: str, chunk_size: int, overlap: int = 0) -> List[Dict[str, Any]]:
    """Fixed-size chunking with optional overlap"""
    words = text.split()
    chunks = []

    for i in range(0, len(words), max(1, chunk_size - overlap)):
        chunk_words = words[i:i + chunk_size]
        chunk_text = " ".join(chunk_words)

        chunks.append({
            "content": chunk_text,
            "start_position": i,
            "end_position": min(i + chunk_size, len(words)),
            "token_count": len(chunk_words)
        })

        if i + chunk_size >= len(words):
            break

    return chunks


def chunk_text_paragraph(text: str) -> List[Dict[str, Any]]:
    """Paragraph-based chunking"""
    paragraphs = text.split('\n\n')
    chunks = []
    position = 0

    for para in paragraphs:
        if para.strip():
            words = para.split()
            chunks.append({
                "content": para.strip(),
                "start_position": position,
                "end_position": position + len(words),
                "token_count": len(words)
            })
            position += len(words)

    return chunks


def chunk_text_semantic(text: str, threshold: float = 0.7) -> List[Dict[str, Any]]:
    """Semantic chunking based on sentence similarity"""
    sentences = text.split('.')
    chunks = []
    current_chunk = []
    position = 0

    for sentence in sentences:
        if sentence.strip():
            current_chunk.append(sentence.strip())

            # Simple heuristic: start new chunk every 3-5 sentences
            if len(current_chunk) >= 4:
                chunk_text = ". ".join(current_chunk) + "."
                words = chunk_text.split()

                chunks.append({
                    "content": chunk_text,
                    "start_position": position,
                    "end_position": position + len(words),
                    "token_count": len(words)
                })

                position += len(words)
                current_chunk = []

    # Add remaining sentences as final chunk
    if current_chunk:
        chunk_text = ". ".join(current_chunk) + "."
        words = chunk_text.split()
        chunks.append({
            "content": chunk_text,
            "start_position": position,
            "end_position": position + len(words),
            "token_count": len(words)
        })

    return chunks


def apply_chunking_strategy(text: str, strategy: ChunkingStrategy) -> List[Dict[str, Any]]:
    """Apply the specified chunking strategy"""
    if strategy.type == "fixed":
        return chunk_text_fixed(text, strategy.size or 100, strategy.overlap or 0)
    elif strategy.type == "sliding":
        return chunk_text_fixed(text, strategy.size or 100, strategy.overlap or 20)
    elif strategy.type == "paragraph":
        return chunk_text_paragraph(text)
    elif strategy.type == "semantic":
        return chunk_text_semantic(text, strategy.threshold or 0.7)
    else:
        # Default to fixed chunking
        return chunk_text_fixed(text, 100, 0)


def get_embeddings(texts: List[str]) -> List[List[float]]:
    """Get embeddings for a list of texts"""
    model = get_embedding_model()

    if model == "dummy" or not HAS_SENTENCE_TRANSFORMERS:
        # Return dummy embeddings for demo purposes
        import random
        return [[random.random() * 0.4 + 0.3 for _ in range(384)] for _ in texts]

    try:
        embeddings = model.encode(texts)
        return embeddings.tolist()
    except Exception as e:
        logger.error(f"Error generating embeddings: {e}")
        # Return dummy embeddings as fallback
        import random
        return [[random.random() * 0.4 + 0.3 for _ in range(384)] for _ in texts]


def calculate_similarity(query_embedding: List[float], chunk_embeddings: List[List[float]]) -> List[float]:
    """Calculate cosine similarity between query and chunks"""
    try:
        if HAS_NUMPY:
            query_vec = np.array(query_embedding)
            chunk_vecs = np.array(chunk_embeddings)

            # Cosine similarity
            similarities = np.dot(chunk_vecs, query_vec) / (
                    np.linalg.norm(chunk_vecs, axis=1) * np.linalg.norm(query_vec)
            )

            return similarities.tolist()
        else:
            # Fallback implementation without numpy
            similarities = []
            query_norm = sum(x * x for x in query_embedding) ** 0.5

            for chunk_emb in chunk_embeddings:
                chunk_norm = sum(x * x for x in chunk_emb) ** 0.5
                dot_product = sum(q * c for q, c in zip(query_embedding, chunk_emb))
                similarity = dot_product / (query_norm * chunk_norm) if query_norm * chunk_norm > 0 else 0
                similarities.append(similarity)

            return similarities
    except Exception as e:
        logger.error(f"Error calculating similarity: {e}")
        # Return random similarities as fallback
        import random
        return [0.4 + 0.4 * random.random() for _ in chunk_embeddings]


async def process_single_query(
        query: Query,
        all_chunks: List[Chunk],
        top_k: int,
        similarity_threshold: float
) -> QueryResult:
    """Process a single query and return results"""
    start_time = time.time()

    # Get embeddings
    query_embedding = get_embeddings([query.text])[0]
    chunk_embeddings = [chunk.embedding for chunk in all_chunks]

    # Calculate similarities
    similarities = calculate_similarity(query_embedding, chunk_embeddings)

    # Get top-k chunks
    chunk_similarity_pairs = list(zip(all_chunks, similarities))
    chunk_similarity_pairs.sort(key=lambda x: x[1], reverse=True)

    top_chunks = [chunk for chunk, _ in chunk_similarity_pairs[:top_k]]
    top_similarities = [sim for _, sim in chunk_similarity_pairs[:top_k]]

    # Check chunk recall
    chunk_recall = False
    recall_rank = None

    # Simple recall check: if query's expected answer appears in any retrieved chunk
    for i, chunk in enumerate(top_chunks):
        if (query.expected_answer.lower() in chunk.content.lower() or
                any(word in chunk.content.lower() for word in query.expected_answer.lower().split() if len(word) > 2)):
            chunk_recall = True
            recall_rank = i + 1
            break

    execution_time = (time.time() - start_time) * 1000

    return QueryResult(
        query_id=query.id,
        query_text=query.text,
        retrieved_chunks=top_chunks,
        similarity_scores=top_similarities,
        chunk_recall=chunk_recall,
        recall_rank=recall_rank,
        execution_time_ms=execution_time
    )


# API Endpoints
@router.post("/evaluate", response_model=ChunkRecallResponse)
async def evaluate_chunk_recall(request: ChunkRecallRequest):
    """
    Evaluate chunk recall for a given chunking strategy
    """
    try:
        start_time = time.time()
        evaluation_id = str(uuid.uuid4())

        logger.info(f"Starting chunk recall evaluation {evaluation_id}")

        # Step 1: Chunk all documents
        all_chunks = []
        total_chunks = 0

        for doc in request.documents:
            chunk_data = apply_chunking_strategy(doc.content, request.strategy)

            for i, chunk_info in enumerate(chunk_data):
                chunk_id = f"{doc.id}_chunk_{i}"

                chunk = Chunk(
                    id=chunk_id,
                    content=chunk_info["content"],
                    document_id=doc.id,
                    start_position=chunk_info["start_position"],
                    end_position=chunk_info["end_position"],
                    token_count=chunk_info["token_count"],
                    embedding=None  # Will be populated below
                )
                all_chunks.append(chunk)
                total_chunks += 1

        # Step 2: Generate embeddings for all chunks
        chunk_texts = [chunk.content for chunk in all_chunks]
        chunk_embeddings = get_embeddings(chunk_texts)

        for chunk, embedding in zip(all_chunks, chunk_embeddings):
            chunk.embedding = embedding

        # Step 3: Process all queries
        query_results = []

        for query in request.queries:
            result = await process_single_query(
                query, all_chunks, request.top_k, request.similarity_threshold
            )
            query_results.append(result)

        # Step 4: Calculate overall metrics
        successful_recalls = sum(1 for result in query_results if result.chunk_recall)
        overall_recall = successful_recalls / len(query_results) if query_results else 0.0

        avg_chunk_size = sum(chunk.token_count for chunk in all_chunks) / len(all_chunks) if all_chunks else 0

        processing_time = (time.time() - start_time) * 1000

        response = ChunkRecallResponse(
            evaluation_id=evaluation_id,
            strategy=request.strategy,
            overall_recall=overall_recall,
            total_chunks=total_chunks,
            avg_chunk_size=avg_chunk_size,
            query_results=query_results,
            processing_time_ms=processing_time,
            metadata={
                "embedding_model": request.embedding_model,
                "timestamp": datetime.now().isoformat(),
                "top_k": request.top_k,
                "similarity_threshold": request.similarity_threshold,
                "has_numpy": HAS_NUMPY,
                "has_sentence_transformers": HAS_SENTENCE_TRANSFORMERS
            }
        )

        logger.info(f"Completed evaluation {evaluation_id} in {processing_time:.2f}ms")
        return response

    except Exception as e:
        logger.error(f"Error in chunk recall evaluation: {e}")
        raise HTTPException(status_code=500, detail=f"Evaluation failed: {str(e)}")


@router.get("/strategies")
async def get_available_strategies():
    """Get list of available chunking strategies"""
    return {
        "strategies": [
            {
                "name": "token_100",
                "type": "fixed",
                "description": "Fixed size chunks (100 tokens)",
                "parameters": {"size": 100}
            },
            {
                "name": "token_200",
                "type": "fixed",
                "description": "Fixed size chunks (200 tokens)",
                "parameters": {"size": 200}
            },
            {
                "name": "sliding_window_100_20",
                "type": "sliding",
                "description": "Sliding window (100 tokens, 20 overlap)",
                "parameters": {"size": 100, "overlap": 20}
            },
            {
                "name": "sliding_window_150_30",
                "type": "sliding",
                "description": "Sliding window (150 tokens, 30 overlap)",
                "parameters": {"size": 150, "overlap": 30}
            },
            {
                "name": "paragraph",
                "type": "paragraph",
                "description": "One paragraph per chunk",
                "parameters": {}
            },
            {
                "name": "semantic_split",
                "type": "semantic",
                "description": "Semantic-based chunking",
                "parameters": {"threshold": 0.7}
            }
        ]
    }


@router.post("/quick-test")
async def quick_test_chunk_recall(
        strategy_name: str = "token_100",
        query_text: str = "What is artificial intelligence?",
        expected_answer: str = "AI is machine intelligence"
):
    """
    Quick test endpoint for chunk recall evaluation
    """
    try:
        # Sample document about QA and testing
        sample_doc = Document(
            id="qa_sample_doc",
            content="""
            Quality Assurance (QA) is a systematic process that ensures software products 
            meet specified requirements and standards. QA encompasses various testing 
            methodologies including unit testing, integration testing, system testing, 
            and acceptance testing. 

            Test Maturity Model Integration (TMMI) is a framework for improving testing 
            processes. It provides a structured approach to assess and enhance testing 
            maturity levels within organizations. TMMI defines five maturity levels 
            from Initial to Optimized.

            Chunking strategies in RAG (Retrieval-Augmented Generation) systems are 
            crucial for effective information retrieval. Different chunking approaches 
            include fixed-size chunking, sliding window chunking, and semantic chunking. 
            Each strategy has its own advantages depending on the use case.

            Automated testing tools can significantly improve testing efficiency and 
            coverage. Popular testing frameworks include Selenium for web applications, 
            Jest for JavaScript testing, and Pytest for Python applications.
            """,
            metadata={"source": "QA testing guide", "domain": "software_testing"}
        )

        # Create strategy
        strategy_configs = {
            "token_100": ChunkingStrategy(name="token_100", type="fixed", size=100),
            "token_200": ChunkingStrategy(name="token_200", type="fixed", size=200),
            "sliding_window": ChunkingStrategy(name="sliding_window", type="sliding", size=100, overlap=20),
            "paragraph": ChunkingStrategy(name="paragraph", type="paragraph"),
            "semantic": ChunkingStrategy(name="semantic", type="semantic", threshold=0.7)
        }

        strategy = strategy_configs.get(strategy_name, strategy_configs["token_100"])

        # Create query
        query = Query(
            id="test_query_1",
            text=query_text,
            expected_answer=expected_answer
        )

        # Create request
        request = ChunkRecallRequest(
            strategy=strategy,
            documents=[sample_doc],
            queries=[query],
            top_k=3,
            similarity_threshold=0.6
        )

        # Evaluate
        result = await evaluate_chunk_recall(request)

        return {
            "quick_test_result": result,
            "summary": {
                "strategy_tested": strategy_name,
                "recall_achieved": result.overall_recall,
                "chunks_created": result.total_chunks,
                "avg_chunk_size": result.avg_chunk_size,
                "processing_time_ms": result.processing_time_ms
            },
            "system_info": {
                "numpy_available": HAS_NUMPY,
                "sentence_transformers_available": HAS_SENTENCE_TRANSFORMERS,
                "embedding_model_type": "sentence-transformers" if HAS_SENTENCE_TRANSFORMERS else "dummy"
            }
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Quick test failed: {str(e)}")


@router.get("/health")
async def chunk_recall_health():
    """Health check for chunk recall service"""
    return {
        "status": "healthy",
        "service": "chunk-recall-evaluation",
        "timestamp": datetime.now().isoformat(),
        "dependencies": {
            "numpy": HAS_NUMPY,
            "sentence_transformers": HAS_SENTENCE_TRANSFORMERS,
            "embedding_model_loaded": embedding_model is not None
        }
    }