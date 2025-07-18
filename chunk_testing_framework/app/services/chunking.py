import re
from typing import List, Tuple
from app.data.loader import DataLoader
from app.services.custom_pdf_preprocessor import DataPreprocessor  # ← Move this class here or import from your script


def chunk_by_paragraph(text: str) -> List[str]:
    paragraphs = [p.strip() for p in text.split("\n\n") if p.strip()]
    return paragraphs


def chunk_by_n_sentences(text: str, n: int = 3) -> List[str]:
    # Split into sentences using regex
    sentence_endings = re.compile(r'(?<=[.!?])\s+')
    sentences = sentence_endings.split(text)
    chunks = [" ".join(sentences[i:i+n]) for i in range(0, len(sentences), n)]
    return [chunk.strip() for chunk in chunks if chunk.strip()]


def chunk_by_token_count(text: str, max_tokens: int = 100) -> List[str]:
    words = text.split()
    chunks = [" ".join(words[i:i+max_tokens]) for i in range(0, len(words), max_tokens)]
    return [chunk.strip() for chunk in chunks if chunk.strip()]

def chunk_by_plank_structure(pages_data: List[Tuple[int, str]]) -> List[str]:
    """
    Chunk structured planks/principles/resolutions from multi-page text data.
    """
    preprocessor = DataPreprocessor()
    docs = preprocessor.process_pdf_data(pages_data)
    return [doc["page_content"] for doc in docs]


def chunk_text(text_or_pages, strategy_name):
    if strategy_name == "plank-structured":
        # Assume text_or_pages is full text string — parse into fake pages
        pages_data = [(i + 1, p.strip()) for i, p in enumerate(text_or_pages.split("\f"))]
        preprocessor = DataPreprocessor()
        docs = preprocessor.process_pdf_data(pages_data)
        return [doc["page_content"] for doc in docs]

    elif strategy_name == "document-based":
        return [text_or_pages]  # treat whole doc as one chunk

    elif strategy_name == "paragraph":
        return [p.strip() for p in text_or_pages.split("\n\n") if p.strip()]

    elif strategy_name == "3-sentence":
        import re
        sentences = re.split(r"(?<=[.!?])\s+", text_or_pages)
        return [
            " ".join(sentences[i:i + 3])
            for i in range(0, len(sentences), 3)
        ]

    elif strategy_name.startswith("token-"):
        from transformers import AutoTokenizer
        token_limit = int(strategy_name.split("-")[1])
        tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
        tokens = tokenizer.tokenize(text_or_pages)
        chunks = [
            tokenizer.convert_tokens_to_string(tokens[i:i + token_limit])
            for i in range(0, len(tokens), token_limit)
        ]
        return chunks

    else:
        raise ValueError(f"Unsupported chunking strategy: {strategy_name}")


