from fastapi import FastAPI
from app.api.v1 import endpoints
from app.core.logger import get_logger

logger = get_logger()

app = FastAPI(
    title="Chunk Testing Framework API",
    version="1.0.0",
    description="Evaluate different chunking strategies for RAG and embedding-based systems",
)

# Include versioned API routes
app.include_router(endpoints.router, prefix="/api/v1", tags=["evaluate"])
logger.info("The aplication has started successfully." + app.title + " " + app.version)