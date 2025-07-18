from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from typing import List

# Internal cache to avoid reloading models
_model_cache = {}

def load_embedding_model(model_name: str) -> SentenceTransformer:
    """
    Load and cache a SentenceTransformer embedding model from Hugging Face.
    """
    if model_name not in _model_cache:
        try:
            print(f"Loading embedding model: {model_name}")
            model = SentenceTransformer(model_name)
            _model_cache[model_name] = model
        except Exception as e:
            raise ValueError(f"Failed to load model '{model_name}': {str(e)}")
    return _model_cache[model_name]


def embed_chunks(chunks: List[str], model: SentenceTransformer) -> List[List[float]]:
    """
    Embed a list of chunks using the specified model.
    """
    return model.encode(chunks, convert_to_tensor=False)


def embed_query(query: str, model: SentenceTransformer) -> List[float]:
    """
    Embed a query using the specified model.
    """
    return model.encode([query])[0]


def retrieve_top_k_chunks(
    chunks: List[str],
    query: str,
    model_name: str,
    top_k: int = 3
) -> List[str]:
    """
    Retrieve top-k most relevant chunks for a given query using cosine similarity.
    """
    model = load_embedding_model(model_name)
    chunk_embeddings = embed_chunks(chunks, model)
    query_embedding = embed_query(query, model)

    similarities = cosine_similarity([query_embedding], chunk_embeddings)[0]
    top_indices = similarities.argsort()[::-1][:top_k]
    return [chunks[i] for i in top_indices]
