# app/services/metrics.py

from sklearn.metrics import f1_score
from typing import List

def calculate_chunk_recall(retrieved_chunks: List[str], relevant_chunks: List[str]) -> float:
    retrieved_set = set(retrieved_chunks)
    relevant_set = set(relevant_chunks)
    if not relevant_set:
        return 0.0
    return len(retrieved_set.intersection(relevant_set)) / len(relevant_set)


def calculate_f1_score(generated_answer: str, ground_truth_answer: str) -> float:
    pred_tokens = generated_answer.lower().split()
    true_tokens = ground_truth_answer.lower().split()
    if not pred_tokens or not true_tokens:
        return 0.0
    common = list(set(pred_tokens + true_tokens))
    pred_vector = [1 if token in pred_tokens else 0 for token in common]
    true_vector = [1 if token in true_tokens else 0 for token in common]
    return f1_score(true_vector, pred_vector)
