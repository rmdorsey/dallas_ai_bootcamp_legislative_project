import re
from langchain_community.document_loaders import PyPDFLoader
from langchain.docstore.document import Document
from typing import List, Tuple, Dict

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
    print(f"Loading document from: {pdf_path}")
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
        
    print(f"Successfully loaded and preprocessed {len(pages)} pages.")
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
    print("Identifying articles and splitting document by logical sections...")

    # Step 1: Find all ARTICLE headings and their positions.
    # This pattern looks for lines starting with "ARTICLE", a number, and an all-caps title.
    article_pattern = re.compile(r'^\s*(ARTICLE\s+(\d+)\.\s+([A-Z\s,]+))$', re.MULTILINE)
    articles = []
    for match in article_pattern.finditer(full_text):
        articles.append({
            'number': match.group(2),
            'title': match.group(3).strip(),
            'start_index': match.start()
        })

    # Step 2: Split the document by SECTION headings.
    # This pattern looks for "SECTION" or "Sec." at the start of a line.
    section_pattern = r'(?=^\s*(?:SECTION|Sec\.)\s+[\d\w])'
    text_chunks = re.split(section_pattern, full_text, flags=re.MULTILINE)

    documents = []
    current_pos = 0
    
    # Process each chunk (which is now a section)
    for chunk in text_chunks:
        chunk_content = chunk.strip()
        if len(chunk_content) < 50:  # Filter out small/empty splits
            continue
        
        # Clean the chunk content to remove PDF artifacts
        cleaned_content = clean_chunk_text(chunk_content)
            
        # Extract only the section's number from the beginning of the cleaned chunk
        section_number = None
        section_header_pattern = r'(?:SECTION|Sec\.)\s*([\d\w\.]+)'
        section_match = re.match(section_header_pattern, cleaned_content)
        
        if section_match:
            # Get the captured group (the number) and clean it.
            section_number = section_match.group(1).strip().rstrip('.')

        # Find the starting position of the original chunk in the full text
        chunk_start_index = full_text.find(chunk_content, current_pos)
        
        # Determine the page number for this chunk
        page_number = 0
        for start_index, page_num in reversed(page_map):
            if chunk_start_index >= start_index:
                page_number = page_num
                break
        
        # Determine which article this chunk belongs to
        current_article = {'number': None, 'title': None}
        for article in reversed(articles):
            if chunk_start_index >= article['start_index']:
                current_article = {'number': article['number'], 'title': article['title']}
                break

        # Create the metadata dictionary
        metadata = {
            'source': pdf_path,
            'page': page_number,
            'article_number': current_article['number'],
            'article_title': current_article['title'],
            'section_number': section_number
        }

        # Create a LangChain Document object for the chunk using the cleaned content
        doc = Document(page_content=cleaned_content, metadata=metadata)
        documents.append(doc)
        
        # Update search position for the next chunk
        current_pos = chunk_start_index + len(chunk_content)
        
    print(f"Successfully split the bill into {len(documents)} structured documents.")
    return documents

# --- Main Execution ---
if __name__ == "__main__":
    pdf_file_path = "HB00002F.pdf"

    # Step 1: Load and preprocess the PDF to get the full text and page map.
    bill_text, page_to_char_map = load_and_preprocess_pdf(pdf_file_path)

    # Step 2: Split the preprocessed text into structured documents by section.
    structured_docs = split_bill_by_section(bill_text, page_to_char_map, pdf_file_path)

    # Step 3: Display a few results to verify the process worked correctly.
    if structured_docs:
        print(f"\nTotal chunks created: {len(structured_docs)}")
        
        print("\n--- Example of a chunk from Article 1 ---")
        for doc in structured_docs:
            if doc.metadata.get('article_number') == '1':
                print(f"Full Content:\n{doc.page_content}")
                print(f"Metadata: {doc.metadata}\n")
                break
                
        print("--- Example of a chunk from Article 4 ---")
        for doc in structured_docs:
            if doc.metadata.get('article_number') == '4':
                print(f"Full Content:\n{doc.page_content}")
                print(f"Metadata: {doc.metadata}\n")
                break
