# endpoints/bills.py
from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import PyPDF2
import pdfplumber
import io
import services.bill_processing as bp

router = APIRouter()

@router.post("/upload-bill/", tags=["Bills"])
async def upload_bill(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are accepted.")
    contents = await file.read()
    try:
        text = bp.extract_text_from_pdf_plumber(contents)
        bp.save_text_to_file(text)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    return {
        "filename": file.filename,
        "num_chars": len(text),
        "content_type": file.content_type,
        "raw_text": text[:500]
    }

@router.post("/analyze/", tags=["Bills"])
async def analyze_bill(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are accepted.")
    contents = await file.read()
    try:
        text = bp.extract_text_from_pdf_plumber(contents)
        bp.save_text_to_file(text)
        sections = bp.split_into_sections(text)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    return {
        "filename": file.filename,
        "num_chars": len(text),
        "content_type": file.content_type,
        "raw_text": text[:500],
        "sections": sections
    }

