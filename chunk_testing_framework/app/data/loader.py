import requests
from bs4 import BeautifulSoup
import fitz  # PyMuPDF


def load_from_url(url: str) -> str:
    """
    Downloads and extracts text content from a web page URL.
    """
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, "html.parser")

        # Remove script and style elements
        for script in soup(["script", "style"]):
            script.decompose()

        # Extract clean text
        text = soup.get_text(separator="\n", strip=True)
        return text

    except Exception as e:
        raise ValueError(f"Failed to load URL: {url}. Error: {str(e)}")


class DataLoader:
    """
    Loads and extracts text from a PDF file.
    Returns a list of (page_number, page_text) tuples.
    """
    def __init__(self, file_path):
        self.file_path = file_path

    def load_text_from_pdf(self):
        try:
            doc = fitz.open(self.file_path)
            pages_data = []
            for page_num, page in enumerate(doc):
                pages_data.append((page_num + 1, page.get_text("text")))
            return pages_data
        except Exception as e:
            raise ValueError(f"Failed to load PDF: {self.file_path}. Error: {str(e)}")

