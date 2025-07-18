from pydantic import BaseModel, Field, HttpUrl
from typing import List, Optional, Literal, Dict
from fastapi import UploadFile, File, Form


# === Input Schema ===

class EvaluationRequest(BaseModel):
    dataset_source_type: Literal["pdf", "url"] = Field(..., description="Source type: 'pdf' or 'url'")
    dataset_source: str = Field(..., description="Path to PDF file or URL to load text")
    embedding_model: str = Field(...,
                                 description="HuggingFace model name (e.g. 'sentence-transformers/all-mpnet-base-v2')")
    test_queries: List[str] = Field(..., description="List of test queries")
    ground_truth_answers: List[str] = Field(..., description="List of expected answers")
    chunk_strategies: List[str] = Field(...,
                                        description="Chunking strategies (e.g., 'paragraph', '3-sentence', 'token-100')")
    metrics: List[str] = Field(..., description="Evaluation metrics (e.g., 'chunk_recall', 'answer_f1')")


# === Metric Results ===

class MetricResult(BaseModel):
    chunk_recall: Optional[float] = None
    answer_f1: Optional[float] = None
    faithfulness: Optional[float] = None
    execution_time: Optional[float] = None


# === Strategy Comparison Output ===

class StrategyResult(BaseModel):
    strategy_name: str
    metrics: MetricResult


# === Full Evaluation Output ===

class EvaluationResponse(BaseModel):
    results: List[StrategyResult]
    metadata: Optional[Dict[str, str]] = Field(default_factory=dict, description="Any extra metadata (e.g. execution timestamp)")
