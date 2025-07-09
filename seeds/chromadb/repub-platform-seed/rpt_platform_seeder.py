import argparse
import yaml
import fitz  # PyMuPDF
import re
from chromadb import HttpClient
from sentence_transformers import SentenceTransformer, models
import uuid
import bisect

def load_config(path: str = "config.yaml") -> dict:
    """
    Loads configuration from a YAML file.
    """
    try:
        with open(path, "r", encoding="utf-8") as f:
            return yaml.safe_load(f)
    except FileNotFoundError:
        print(f"Warning: {path} not found. Using default settings.")
        # Provide a default configuration if the file is missing
        return {
            'model': {'name': 'all-MiniLM-L6-v2'},
            'chromadb': {'host': 'localhost', 'port': 8001},
            'collection': 'rpt_platform_2024_pdf',
            'data': {'raw_document_path': '2024-RPT-Platform.pdf'}
        }

class Utils:
    """
    Utility class for generating unique IDs.
    """
    def __init__(self):
        pass

    def nextId(self) -> str:
        """
        Generates a unique ID.
        """
        return str(uuid.uuid4())

class DataLoader:
    """
    Loads and extracts text and structure from a PDF file.
    """
    def __init__(self, file_path):
        self.file_path = file_path

    def load_text_from_pdf(self):
        """
        Extracts text from each page of the PDF.

        Returns:
            A list of tuples, where each tuple contains the page number and the text content of that page.
        """
        try:
            doc = fitz.open(self.file_path)
            pages_data = []
            for page_num, page in enumerate(doc):
                pages_data.append((page_num + 1, page.get_text("text")))
            print(f"Successfully loaded {len(doc)} pages from {self.file_path}")
            return pages_data
        except Exception as e:
            raise Exception(f"Failed to load or process PDF file: {e}")

class DataPreprocessor:
    """
    Processes the extracted PDF text to structure it into planks, principles, and resolutions with metadata.
    """
    def __init__(self):
        # Main sections used to identify 'main_section' metadata
        self.H1_SECTIONS = [
            "Preamble", "Principles", "Constitutional Issues", 
            "Business, Commerce, and Transportation", "Finance", "Education", 
            "Health and Human Services", "Criminal and Civil Justice", "State Affairs", 
            "Government and Election Integrity", "National Defense and Foreign Affairs", 
            "Resolutions"
        ]
        # Sub-sections used to identify 'sub_section' metadata
        self.H2_SECTIONS = [
            "Preservation of Constitution", "Citizen Rights", "State Sovereignty",
            "Markets and Regulation", "Retirement, Savings, Unions", "Energy and Environment",
            "Transportation", "COVID Response", "Privacy, Information Freedom, Internet",
            "Spending Restraint", "School Finance and Property Taxation", 
            "Opposition to Market-Distorting Tax and Fiscal Subsidies", "Transparency and Oversight",
            "Parents' Rights", "Curriculum", "Governance", "Higher Education",
            "Healthcare Independence", "Government-funded Health Programs", "Mental Health",
            "Homosexuality and Gender Issues", "Substance Abuse and Addiction", 
            "Life-Affirming Health Care Concepts", "Environmental Health",
            "Rights and Protections", "Courts, Prosecutions, Restitution", "Law Enforcement",
            "Family Law", "Heritage Preservation", "Individual Rights and Freedoms",
            "Family and Gender Issues", "Pro-Life Issues", "Land Use", "State Governance",
            "Government Operations", "Elections", "Veterans Affairs", 
            "Border Security and Immigration", "Foreign Affairs"
        ]

    def process_pdf_data(self, pages_data):
        """
        Parses the text from PDF pages to extract documents (planks, principles, resolutions) 
        and their associated metadata using a holistic, position-based approach.
        """
        all_docs = []
        
        # --- Step 1: Aggregate text and create a page map ---
        full_text = ""
        page_start_indices = [0]
        for _, text in pages_data:
            full_text += text + "\n" # Add newline to simulate page break
            page_start_indices.append(len(full_text))

        def get_page_number(char_index):
            # bisect_right finds the insertion point, which corresponds to the page number
            return bisect.bisect_right(page_start_indices, char_index)

        # --- Step 2: Define Content Boundaries to Exclude TOC and Index ---
        try:
            # The main content starts at the "Preamble" header.
            content_start_pos = full_text.find("Preamble")
            # The main content ends right before the "Index" header.
            content_end_pos = full_text.rfind("Index")
            if content_start_pos == -1 or content_end_pos == -1 or content_start_pos > content_end_pos:
                raise ValueError("Boundary markers (Preamble/Index) not found or in wrong order.")
            print(f"Content body defined from index {content_start_pos} to {content_end_pos}.")
        except ValueError as e:
            print(f"Warning: Could not define content boundaries. Processing full text. Error: {e}")
            content_start_pos = 0
            content_end_pos = len(full_text)

        # --- Step 3: Find all headers and documents within the defined boundaries ---
        h1_locations = []
        h2_locations = []
        doc_matches = []

        # Find H1 headers within the content body
        h1_pattern_str = r"^\s*(" + "|".join(re.escape(h) for h in self.H1_SECTIONS) + r")\s*$"
        h1_pattern = re.compile(h1_pattern_str, re.MULTILINE)
        for match in h1_pattern.finditer(full_text, content_start_pos, content_end_pos):
             h1_locations.append({'pos': match.start(), 'text': match.group(1).strip()})

        # Find H2 headers within the content body
        h2_pattern_str = r"^\s*(" + "|".join(re.escape(h) for h in self.H2_SECTIONS) + r")\s*$"
        h2_pattern = re.compile(h2_pattern_str, re.MULTILINE)
        for match in h2_pattern.finditer(full_text, content_start_pos, content_end_pos):
             h2_locations.append({'pos': match.start(), 'text': match.group(1).strip()})

        h1_locations.sort(key=lambda x: x['pos'])
        h2_locations.sort(key=lambda x: x['pos'])

        print(f"Found {len(h1_locations)} main sections and {len(h2_locations)} sub-sections within content body.")

        # Find documents (planks, principles, resolutions) within the content body
        doc_regex = re.compile(r"^\s*(\d+)\.\s+([A-Z].*)", re.MULTILINE)
        for match in doc_regex.finditer(full_text, content_start_pos, content_end_pos):
            doc_matches.append(match)

        # --- Step 4: Process special unnumbered sections ---
        try:
            preamble_h1_pos = next(h1['pos'] for h1 in h1_locations if h1['text'] == 'Preamble')
            preamble_start = preamble_h1_pos + len("Preamble")
            preamble_end = next(h1['pos'] for h1 in h1_locations if h1['text'] == 'Principles')
            preamble_content = full_text[preamble_start:preamble_end].strip().replace('\n', ' ')
            all_docs.append({
                "page_content": preamble_content,
                "metadata": { "type": "preamble", "main_section": "Preamble", "sub_section": "N/A", "title": "N/A", "number": "N/A", "page_number": get_page_number(preamble_start) }
            })
        except (ValueError, StopIteration):
            print("Warning: Could not find Preamble section or its end.")

        try:
            principles_h1_pos = next(h1['pos'] for h1 in h1_locations if h1['text'] == 'Principles')
            principles_start = principles_h1_pos + len("Principles")
            principles_end = doc_matches[0].start() # Ends where the first numbered principle begins
            principles_intro = full_text[principles_start:principles_end].strip().replace('\n', ' ')
            all_docs.append({
                "page_content": principles_intro,
                "metadata": { "type": "principle_introduction", "main_section": "Principles", "sub_section": "N/A", "title": "N/A", "number": "N/A", "page_number": get_page_number(principles_start) }
            })
        except (ValueError, IndexError, StopIteration):
             print("Warning: Could not find Principles introduction.")

        # --- Step 5: Associate each document with its correct headers ---
        for i, match in enumerate(doc_matches):
            doc_start_pos = match.start()

            # Find the correct H1 (main_section)
            current_h1 = "N/A"
            for h1 in reversed(h1_locations):
                if h1['pos'] < doc_start_pos:
                    current_h1 = h1['text']
                    break
            
            # Find the correct H2 (sub_section)
            current_h2 = "N/A"
            current_h1_pos = next((h1['pos'] for h1 in reversed(h1_locations) if h1['pos'] < doc_start_pos), -1)
            for h2 in reversed(h2_locations):
                if h2['pos'] < doc_start_pos and h2['pos'] > current_h1_pos:
                    current_h2 = h2['text']
                    break

            # Extract content and metadata
            number = match.group(1)
            full_title_line = match.group(2).strip()
            
            doc_end_pos = doc_matches[i+1].start() if i + 1 < len(doc_matches) else content_end_pos
            content = full_text[doc_start_pos:doc_end_pos].strip().replace('\n', ' ')
            page_number = get_page_number(doc_start_pos)

            # Determine document type
            if current_h1 == "Principles":
                doc_type = "principle"
            elif current_h1 == "Resolutions":
                doc_type = "resolution"
            else:
                doc_type = "plank"

            # Set title only for planks and resolutions
            title = full_title_line.split(':')[0].strip() if doc_type in ["plank", "resolution"] else "N/A"

            doc = {
                "page_content": content,
                "metadata": {
                    "type": doc_type,
                    "main_section": current_h1,
                    "sub_section": current_h2,
                    "title": title,
                    "number": number,
                    "page_number": page_number
                }
            }
            all_docs.append(doc)
        
        print(f"Successfully processed and found {len(all_docs)} documents.")
        return all_docs

class DataVectorize:
    """
    Generates vector embeddings for the processed data.
    """
    def __init__(self, embedding_model_name):
        self.utils = Utils()
        self.embedding_model = SentenceTransformer(embedding_model_name)
        print(f"Embedding model '{embedding_model_name}' loaded.")

    def generate_embeddings_for_corpus(self, documents):
        """
        Generates embeddings for each document.
        """
        data = []
        for doc in documents:
            try:
                embedding = self.embedding_model.encode(doc['page_content']).tolist()
                
                metadata = {
                    "content": doc['page_content'],
                    "type": doc['metadata'].get("type", ""),
                    "main_section": doc['metadata'].get("main_section", ""),
                    "sub_section": doc['metadata'].get("sub_section", ""),
                    "title": doc['metadata'].get("title", ""),
                    "number": doc['metadata'].get("number", ""),
                    "page_number": doc['metadata'].get("page_number", "")
                }

                data.append({
                    "id": self.utils.nextId(),
                    "values": embedding,
                    "metadata": metadata
                })
            except Exception as e:
                raise Exception(f"Issue generating embeddings for document: {doc}. Error: {e}")
        
        print(f"Generated embeddings for {len(data)} documents.")
        return data

class SeedChromaDB:
    """
    Connects to ChromaDB and seeds it with the vectorized data.
    """
    def __init__(self, host="localhost", port=8001):
        try:
            self.client = HttpClient(host=host, port=port)
            print(f"Connected to ChromaDB at {host}:{port}")
        except Exception as e:
            raise Exception(f"Failed to connect to ChromaDB: {e}")

    def seed(self, collection_name, embedding_data):
        """
        Adds the data to the specified ChromaDB collection.
        """
        # Delete the collection if it exists, to ensure a fresh start
        try:
            self.client.delete_collection(name=collection_name)
            print(f"Deleted existing collection: '{collection_name}'")
        except Exception:
            # This is fine, it just means the collection didn't exist
            pass
        
        collection = self.client.get_or_create_collection(name=collection_name)

        documents = [item["metadata"]["content"] for item in embedding_data]
        embeddings = [item["values"] for item in embedding_data]
        metadatas = [item["metadata"] for item in embedding_data]
        ids = [item["id"] for item in embedding_data]

        batch_size = 100
        for i in range(0, len(ids), batch_size):
            collection.add(
                ids=ids[i:i+batch_size],
                embeddings=embeddings[i:i+batch_size],
                documents=documents[i:i+batch_size],
                metadatas=metadatas[i:i+batch_size]
            )
            print(f"Seeded batch {i//batch_size + 1}/{(len(ids) + batch_size - 1)//batch_size}")

        print(f"Seeded {len(embedding_data)} records into ChromaDB collection: '{collection_name}'")

class SeedFactory:
    """
    Orchestrates the entire data loading, processing, and seeding pipeline.
    """
    def __init__(self, cfg: dict):
        embedding_model_name = cfg['model']['name']
        host = cfg['chromadb']['host']
        port = cfg['chromadb']['port']
        collection_name = cfg['collection']
        raw_document_file_path = cfg["data"]["raw_document_path"]

        # 1. Load data from PDF
        data_loader = DataLoader(raw_document_file_path)
        pages_data = data_loader.load_text_from_pdf()

        # 2. Preprocess the extracted text
        data_preprocessor = DataPreprocessor()
        processed_docs = data_preprocessor.process_pdf_data(pages_data)

        # 3. Vectorize the processed data
        data_vectorizer = DataVectorize(embedding_model_name)
        embedding_data = data_vectorizer.generate_embeddings_for_corpus(processed_docs)

        # 4. Seed the database
        db_seeder = SeedChromaDB(host=host, port=port)
        db_seeder.seed(collection_name=collection_name, embedding_data=embedding_data)

        print("\nPipeline finished successfully!")

def main():
    """
    Main function to run the script.
    """
    parser = argparse.ArgumentParser(description="Seed ChromaDB with embedded PDF content.")
    parser.add_argument(
        '-c', '--config',
        type=str,
        default='config.yaml',
        help='Path to the YAML configuration file'
    )

    args = parser.parse_args()
    cfg = load_config(args.config)

    SeedFactory(cfg)

if __name__ == "__main__":
    main()