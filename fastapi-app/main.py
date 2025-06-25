from fastapi import FastAPI
from endpoints.helloworld import router as helloworld_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="RPT Plank Similarity Search API",)

@app.get("/healthz", tags=["Health"])
async def healthz():
    return {"status": "ok"}

# Include routers for each table
app.include_router(helloworld_router, prefix="/hello_world", tags=["Hello World"])

origins = [
    # "http://localhost:4200",  # Angular app
    # "http://localhost:5173",  # Vite default port
    # "http://localhost:8050", # The current dashboard
    "*", # allow all origins
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
