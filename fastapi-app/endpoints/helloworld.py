from fastapi import APIRouter
from fastapi.responses import PlainTextResponse

router = APIRouter()

@router.get("/", response_class=PlainTextResponse)
async def hello_world():
    return "Hello, World!"