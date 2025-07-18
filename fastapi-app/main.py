from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from endpoints.helloworld import router as helloworld_router
from endpoints.bills import router as bills_router
from endpoints.chunk_recall import router as chunk_recall

import PyPDF2
import io

app = FastAPI(title="Dallas AI Summer Program: Legislative Project")

@app.get("/healthz", tags=["Health"])
async def healthz():
    return {"status": "ok"}

# Include routers for each endppoint
app.include_router(helloworld_router, prefix="/hello_world", tags=["Hello World"])
app.include_router(bills_router, prefix="/bills", tags=["Bills"])
app.include_router(chunk_recall, prefix="/chunck", tags=["Chunck Recall"])

origins = [
    # "http://localhost:4200",  # Angular app
    # "http://localhost:5173",  # Vite default port
    # "http://localhost:8050", # The current dashboard
    "*",  # allow all origins
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)