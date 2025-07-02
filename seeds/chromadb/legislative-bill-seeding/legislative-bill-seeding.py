import re
import os
import yaml
import chromadb
from langchain_community.document_loaders import PyPDFLoader
from langchain.docstore.document import Document
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from typing import List, Tuple, Dict

def load_config(config_path: str = 'config.yaml') -> Dict:
    """
    Loads configuration settings from a YAML file.

    Args:
        config_path: The path to the YAML configuration file.

    Returns:
        A dictionary containing the configuration settings.
    """
    print(f"Loading configuration from {config_path}...")
    with open(config_path, 'r') as f:
        config = yaml.safe_load(f)
    return config

def load_and_preprocess_pdf(pdf_path: str) -> Tuple[str, List[Tuple[int, int]]]:
    """
    Loads a PDF, extracts text, and creates a map of character positions to page numbers.

    This function reads a PDF file page by page, concatenates the text into a single
    string, and builds a page map. The page map is essential for correctly assigning
    a page number to each chunk after splitting.

    Args:
        pdf_path: The file path to the PDF.

    Returns:
        A tuple containing:
        - A single string with the full text of the document.
        - A page_map list of tuples, where each tuple is (start_char_index, page_number).
    """
    print(f"\nLoading document from: {pdf_path}")
    # Use PyPDFLoader to load the document. It creates one Document object per page.
    loader = PyPDFLoader(pdf_path)
    pages = loader.load()
    
    full_text = ""
    page_map = []
    
    # Iterate through each page to build the full text and the page map
    for page_doc in pages:
        # Record the starting character position for this page's content
        start_index = len(full_text)
        page_map.append((start_index, page_doc.metadata.get("page", 0)))
        
        # Append the page's content to the full text string
        full_text += page_doc.page_content + "\n"
        
    print(f"Successfully loaded and preprocessed {len(pages)} pages from {os.path.basename(pdf_path)}.")
    return full_text, page_map

def clean_chunk_text(text: str) -> str:
    """
    Cleans the extracted text from PDF conversion artifacts.

    Args:
        text: The raw text chunk extracted from the PDF.

    Returns:
        The cleaned text with line numbers, footers, and other artifacts removed.
    """
    # Remove line numbers that are at the beginning of lines
    cleaned_text = re.sub(r'^\d+\s+', '', text, flags=re.MULTILINE)
    
    # Remove page footers like "H.B. No. 2" and the page number that follows
    cleaned_text = re.sub(r'H\.B\.\s+No\.\s+\d+\s*\n\d+', '', cleaned_text, flags=re.IGNORECASE)
    
    # Remove any remaining standalone page numbers on their own lines
    cleaned_text = re.sub(r'^\d+$', '', cleaned_text, flags=re.MULTILINE)

    # Remove the "A" and "AA" artifacts that appear from PDF extraction
    cleaned_text = re.sub(r'\s+(A|AA)\s+', ' ', cleaned_text)
    
    # Collapse multiple newlines into a single one to improve readability
    cleaned_text = re.sub(r'\n{2,}', '\n', cleaned_text).strip()
    
    return cleaned_text

def split_bill_by_section(full_text: str, page_map: List[Tuple[int, int]], pdf_path: str) -> List[Document]:
    """
    Splits the legislative bill text into chunks based on SECTION markers
    and creates LangChain Document objects with article, section, and page number metadata.

    This function first identifies all major ARTICLE headings to understand the
    document's structure. It then splits the text by each SECTION, and for each
    section, it adds metadata indicating which article and section it belongs to.

    Args:
        full_text: The complete text of the bill.
        page_map: A list mapping character start indices to page numbers.
        pdf_path: The original path to the PDF for the source metadata.

    Returns:
        A list of LangChain Document objects, each representing a section.
    """
    print(f"Identifying articles and splitting sections for {os.path.basename(pdf_path)}...")

    # Step 1: Find all ARTICLE headings and their positions.
    article_pattern = re.compile(r'^\s*(ARTICLE\s+(\d+)\.\s+([A-Z\s,]+))$', re.MULTILINE)
    articles = []
    for match in article_pattern.finditer(full_text):
        articles.append({
            'number': match.group(2),
            'title': match.group(3).strip(),
            'start_index': match.start()
        })

    # Step 2: Split the document by SECTION headings.
    section_pattern = r'(?=^\s*(?:SECTION|Sec\.)\s+[\d\w])'
    text_chunks = re.split(section_pattern, full_text, flags=re.MULTILINE)

    documents = []
    current_pos = 0
    
    for chunk in text_chunks:
        chunk_content = chunk.strip()
        if len(chunk_content) < 50:
            continue
        
        cleaned_content = clean_chunk_text(chunk_content)
            
        section_number = None
        section_header_pattern = r'(?:SECTION|Sec\.)\s*([\d\w\.]+)'
        section_match = re.match(section_header_pattern, cleaned_content)
        
        if section_match:
            section_number = section_match.group(1).strip().rstrip('.')

        chunk_start_index = full_text.find(chunk_content, current_pos)
        
        page_number = 0
        for start_index, page_num in reversed(page_map):
            if chunk_start_index >= start_index:
                page_number = page_num
                break
        
        current_article = {'number': None, 'title': None}
        for article in reversed(articles):
            if chunk_start_index >= article['start_index']:
                current_article = {'number': article['number'], 'title': article['title']}
                break

        metadata = {
            'source': pdf_path,
            'page': page_number,
            'article_number': current_article['number'],
            'article_title': current_article['title'],
            'section_number': section_number
        }

        doc = Document(page_content=cleaned_content, metadata=metadata)
        documents.append(doc)
        
        current_pos = chunk_start_index + len(chunk_content)
        
    print(f"Successfully split {os.path.basename(pdf_path)} into {len(documents)} structured documents.")
    return documents

def upsert_to_chroma(documents: List[Document], collection_name: str, embedding_model_name: str, chroma_host: str, chroma_port: int):
    """
    Vectorizes documents and upserts them into a ChromaDB collection.

    Args:
        documents: A list of LangChain Document objects to be upserted.
        collection_name: The name of the ChromaDB collection.
        embedding_model_name: The name of the Hugging Face model for embeddings.
        chroma_host: The hostname or IP address of the ChromaDB server.
        chroma_port: The port number of the ChromaDB server.
    """
    print(f"\nInitializing embedding model: {embedding_model_name}")
    # Initialize the embedding model from Hugging Face.
    embeddings = HuggingFaceEmbeddings(model_name=embedding_model_name)
    
    print(f"Connecting to ChromaDB at {chroma_host}:{chroma_port}")
    # Initialize the ChromaDB client.
    client = chromadb.HttpClient(host=chroma_host, port=chroma_port)

    print(f"Upserting {len(documents)} documents to collection '{collection_name}'. This may take a moment...")
    # Use LangChain's Chroma vector store to handle the embedding and upserting.
    # This will create the collection if it doesn't exist.
    Chroma.from_documents(
        client=client,
        collection_name=collection_name,
        documents=documents,
        embedding=embeddings,
    )
    
    print("Successfully upserted documents to ChromaDB.")

# --- Main Execution ---
if __name__ == "__main__":
    # Load configuration from the YAML file
    config = load_config()
    
    # Extract settings from the config dictionary
    chroma_config = config.get('chromadb', {})
    embedding_config = config.get('embedding', {})
    source_dir_config = config.get('source_directory', {})

    source_directory = source_dir_config.get('path', 'docs/')
    embedding_model_name = embedding_config.get('model_name', 'nlpaueb/legal-bert-base-uncased')
    chroma_collection_name = chroma_config.get('collection_name', 'legislation-89-r')
    chroma_server_host = chroma_config.get('host', 'localhost')
    chroma_server_port = chroma_config.get('port', 8001)

    all_docs_to_upsert = []

    # Iterate through all files in the source directory
    if not os.path.isdir(source_directory):
        print(f"Error: Source directory '{source_directory}' not found.")
    else:
        for filename in os.listdir(source_directory):
            if filename.lower().endswith('.pdf'):
                pdf_file_path = os.path.join(source_directory, filename)
                
                # Step 1: Load and preprocess the PDF.
                bill_text, page_to_char_map = load_and_preprocess_pdf(pdf_file_path)

                # Step 2: Split the text into structured documents.
                structured_docs = split_bill_by_section(bill_text, page_to_char_map, pdf_file_path)
                
                # Add the processed documents to our main list
                all_docs_to_upsert.extend(structured_docs)

    # Step 3: Vectorize and upsert all collected documents to ChromaDB in one batch.
    if all_docs_to_upsert:
        upsert_to_chroma(
            documents=all_docs_to_upsert,
            collection_name=chroma_collection_name,
            embedding_model_name=embedding_model_name,
            chroma_host=chroma_server_host,
            chroma_port=chroma_server_port
        )
        
        # Step 4: Display final summary.
        print(f"\nProcess complete. Total chunks created and upserted from all files: {len(all_docs_to_upsert)}")
    else:
        print("No PDF files found in the source directory to process.")
