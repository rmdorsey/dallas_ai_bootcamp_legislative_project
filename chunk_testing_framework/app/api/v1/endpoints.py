from fastapi import APIRouter, HTTPException
from app.models.schemas import EvaluationRequest, EvaluationResponse, StrategyResult, MetricResult
from app.services.evaluation import evaluate_strategy
from app.services.chunking import chunk_text
#from app.services.interpreter import interpret_with_openai
from app.data.loader import load_from_url, DataLoader
from app.core.logger import get_logger
from pydantic import BaseModel
from typing import Dict

router = APIRouter()
logger = get_logger()
logger.info("✅ endpoints.py loaded")

@router.post("/evaluate", response_model=EvaluationResponse)
def evaluate_chunks(request: EvaluationRequest):
    logger.info("📥 Received evaluation request")
    logger.debug(f"Model: {request.embedding_model}")
    logger.debug(f"Strategies: {request.chunk_strategies}")
    logger.debug(f"Queries: {request.test_queries}")
    logger.debug(f"Source Type: {request.dataset_source_type}")
    logger.debug(f"Source Path: {request.dataset_source}")

    # Load dataset
    try:
        if request.dataset_source_type == "url":
            document_text = load_from_url(request.dataset_source)
            logger.info(f"Loaded content from URL: {request.dataset_source}")
        elif request.dataset_source_type == "pdf":
            pages = DataLoader(request.dataset_source).load_text_from_pdf()
            document_text = "\n".join([text for _, text in pages])
            logger.info(f"Loaded PDF from: {request.dataset_source}")
        else:
            raise HTTPException(status_code=400, detail="Invalid dataset_source_type. Use 'url' or 'pdf'.")
    except Exception as e:
        logger.error(f"Failed to load dataset: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error loading dataset: {str(e)}")

    # Evaluate each strategy
    results = []
    for strategy in request.chunk_strategies:
        try:
            logger.info(f"Evaluating strategy: {strategy}")
            chunks = chunk_text(document_text, strategy)
            logger.debug(f"Generated {len(chunks)} chunks using strategy '{strategy}'")

            eval_result = evaluate_strategy(
                strategy_name=strategy,
                queries=request.test_queries,
                ground_truths=request.ground_truth_answers,
                all_chunks=chunks,
                embedding_model=request.embedding_model,
                selected_metrics=request.metrics,
                top_k = 3
            )

            logger.debug(f"Strategy '{strategy}' results: {eval_result}")
            results.append(StrategyResult(
                strategy_name=strategy,
                metrics=MetricResult(**eval_result)
            ))

        except Exception as e:
            logger.exception(f"Error evaluating strategy '{strategy}'")
            raise HTTPException(status_code=500, detail=f"Evaluation failed for strategy '{strategy}': {str(e)}")

    logger.info("🏁 All strategies evaluated successfully.")
    return EvaluationResponse(
        results=results,
        metadata={"note": f"Evaluated using embedding model: {request.embedding_model}"}
    )


