# services/bill_processing.py
import PyPDF2
import re
import io
import pdfplumber

def split_into_sections(text):
    sections = re.split(r'SECTION\s+[A-Za-z0-9]{2}\.[A-Za-z0-9]{2}', text)
    results = []
    for i in range(1, len(sections), 2):
        section_title = sections[i].strip()
        section_text = sections[i+1].strip() if i+1 < len(sections) else ''
        results.append({'title': section_title, 'text': section_text})
    if not results:
        raise ValueError("This file doesn't contain any section")
    return results

def extract_text_from_pdf(contents: bytes) -> str:
    try:
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(contents))
        text = ""
        for page in pdf_reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text
        return text
    except Exception as e:
        raise RuntimeError(f"Failed to process PDF: {e}")
    
def extract_text_from_pdf_plumber(contents: bytes) -> str:
    try:
        text = ""
        with pdfplumber.open(io.BytesIO(contents)) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text
        return text
    except Exception as e:
        raise RuntimeError(f"Failed to process PDF: {e}")  
    
def save_text_to_file(raw_text, filename="output.txt"):
    with open(filename, "w", encoding="utf-8") as f:
        f.write(raw_text)
    return filename
