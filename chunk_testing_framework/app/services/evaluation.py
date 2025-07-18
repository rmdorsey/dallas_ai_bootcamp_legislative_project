import time
from typing import List, Dict, Any
from app.services.metrics import calculate_chunk_recall, calculate_f1_score
from app.services.retrieval import retrieve_top_k_chunks
from app.core.logger import get_logger

logger = get_logger()


def evaluate_strategy(
    strategy_name: str,
    queries: List[str],
    ground_truths: List[str],
    all_chunks: List[str],
    embedding_model: str,
    selected_metrics: List[str] = None,  # <- Add this line
    top_k: int = 3
) -> Dict[str, Any]:
    logger.info(f"Evaluating strategy '{strategy_name}' with {len(queries)} queries")

    results = {
        "chunk_recall": 0,
        "answer_f1": 0,
        "faithfulness": 0,
        "execution_time": 0,
    }

    start_time = time.time()

    for i, query in enumerate(queries):
        logger.debug(f"Query {i + 1}/{len(queries)}: {query}")

        retrieved_chunks = retrieve_top_k_chunks(
            chunks=all_chunks,
            query=query,
            model_name=embedding_model,
            top_k=top_k  # ✅ Now this is defined
        )
    """
    Evaluate a chunking strategy using real embedding-based retrieval.
    """

    logger.info(f"Evaluating strategy '{strategy_name}' with {len(queries)} queries")
    start_time = time.time()

    chunk_recall_scores = []
    f1_scores = []
    faithfulness_scores = []

    for i, query in enumerate(queries):
        logger.debug(f"Query {i + 1}/{len(queries)}: {query}")

        # Retrieve top-k chunks using the embedding model
        retrieved_chunks = retrieve_top_k_chunks(
            chunks=all_chunks,
            query=query,
            model_name=embedding_model,
            top_k=top_k
        )

        # Generate an answer (naive: concatenate top chunks)
        generated_answer = " ".join(retrieved_chunks)
        ground_truth_answer = ground_truths[i]

        # Simulate relevant chunks for recall (chunks containing ground truth answer)
        relevant_chunks = [chunk for chunk in all_chunks if ground_truth_answer.lower() in chunk.lower()]

        recall = calculate_chunk_recall(retrieved_chunks, relevant_chunks)
        f1 = calculate_f1_score(generated_answer, ground_truth_answer)
        faithfulness = 1.0 if f1 > 0.85 else 0.0  # Naive heuristic

        logger.debug(f"Recall: {recall:.2f}, F1: {f1:.2f}, Faithfulness: {faithfulness}")

        chunk_recall_scores.append(recall)
        f1_scores.append(f1)
        faithfulness_scores.append(faithfulness)

    end_time = time.time()
    duration = round(end_time - start_time, 3)

    # Aggregate results
    return {
        "chunk_recall": round(sum(chunk_recall_scores) / len(chunk_recall_scores), 3),
        "answer_f1": round(sum(f1_scores) / len(f1_scores), 3),
        "faithfulness": round(sum(faithfulness_scores) / len(faithfulness_scores), 3),
        "execution_time": duration
    }
