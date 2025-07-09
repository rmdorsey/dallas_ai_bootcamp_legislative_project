import argparse
import yaml
from chromadb import HttpClient
from utils import Utils
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_text_splitters import MarkdownHeaderTextSplitter
from sentence_transformers import SentenceTransformer, models

def load_config(path: str = "config.yaml") -> dict:
    """
    Load configuration from a YAML file.
    """
    with open(path, "r", encoding="utf-8") as f:
        return yaml.safe_load(f)

class DataLoader:
  def __init__(self, file_path):
    self.file_path = file_path

  def loadTheLocalMarkdownFile(self):
    with open(self.file_path, 'r', encoding='utf-8') as file:
        file_content = file.read()

    return file_content

class DataPreprocessor:

  def __init__(self):
    pass

  def splitTheRawMarkDownData(self, docs, do_character_split_after_split_by_markdown, chunk_size, chunk_overlap):
    headers_to_split_on = [
      ("#", "Header 1"),
      ("##", "Header 2"),
      ("###", "Header 3"),
    ]

    # need a markdown_document
    markdown_splitter = MarkdownHeaderTextSplitter(headers_to_split_on=headers_to_split_on)
    md_header_splits = markdown_splitter.split_text(docs)

    # Now split again by character count
    if do_character_split_after_split_by_markdown:
      text_splitter = RecursiveCharacterTextSplitter(
          chunk_size=chunk_size, chunk_overlap=chunk_overlap
      )

      splits = text_splitter.split_documents(md_header_splits)
    else:
      splits = md_header_splits

    print("Split the data successfully!")
    # print(splits)
    return splits

  # create a function that loops through an array of strings removing all instances of new line characters.  Return the processed array.
  def removeNewLine(self, text):
    return text.replace("\n", " ")

  def removeNewLineFromData(self, splits):
    for split in splits:
      split.page_content = self.removeNewLine(split.page_content)

    # return the processed array
    return splits

class DataVectorize:
  def __init__(self, embedding_model):
    # includes the id generator
    self.utils = Utils()
    if "nlpaueb/legal-bert-base-uncased" in embedding_model:
      word_embedding_model = models.Transformer(embedding_model)
      pooling_model = models.Pooling(word_embedding_model.get_word_embedding_dimension())
      self.embedding_model = SentenceTransformer(modules=[word_embedding_model, pooling_model])
    else:
      self.embedding_model = SentenceTransformer(embedding_model)

  def generateEmbeddingsForCorpus(self, text):
      data = []

      # loop through the text array and assign each element to textChunk
      for textChunk in text:
        try:
          embedding = self.embedding_model.encode(textChunk.page_content).tolist()
          
          # append the textChunk to the data array
          data.append({
              "id": self.utils.nextId(),
              "values": embedding,
              "metadata": {
                  "content": textChunk.page_content,
                  "header1": textChunk.metadata.get("Header 1", ""), # Use .get() with a default value
                  "header2": textChunk.metadata.get("Header 2", ""),
                  "header3": textChunk.metadata.get("Header 3", ""),
                  "header4": textChunk.metadata.get("Header 4", ""),
              }
          })
        except Exception as e:
          # Print the error message
          raise Exception(f"Issue generating embeddings: {e}")

      return data

class SeedChromaDB:
    def __init__(self, host="localhost", port=8001):
        self.client = HttpClient(host=host, port=port)

    def seed(self, collection_name, embedding_data):
        collection = self.client.get_or_create_collection(name=collection_name)

        documents = [item["metadata"]["content"] for item in embedding_data]
        embeddings = [item["values"] for item in embedding_data]
        metadatas = [item["metadata"] for item in embedding_data]
        ids = [item["id"] for item in embedding_data]

        collection.add(
            documents=documents,
            embeddings=embeddings,
            metadatas=metadatas,
            ids=ids
        )

        print(f"Seeded {len(embedding_data)} records into ChromaDB collection: {collection_name}")

class SeedFactory:
    def __init__(self, cfg: dict):
                
        # Extract config values
        embedding_model = cfg['model']['name']
        host = cfg['chromadb']['host']
        port = cfg['chromadb']['port']
        collection_name = cfg['collection']

        raw_document_file_path      = cfg["data"]["raw_document_path"]
        do_split       = cfg["preprocessing"]["do_character_split_after_split_by_markdown"]
        chunk_size     = cfg["preprocessing"]["chunk_size"]
        chunk_overlap  = cfg["preprocessing"]["chunk_overlap"]

        data_loader = DataLoader(raw_document_file_path)
        data_preprocessor = DataPreprocessor()
        data_vectorize = DataVectorize(embedding_model)

        raw_doc = data_loader.loadTheLocalMarkdownFile()
        split_docs = data_preprocessor.splitTheRawMarkDownData(
            docs=raw_doc,
            do_character_split_after_split_by_markdown=do_split,
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap
        )
        embeddingData = data_vectorize.generateEmbeddingsForCorpus(split_docs)
        print("Generated embeddings!")

        db_seeder = SeedChromaDB(host=host, port=port)
        db_seeder.seed(collection_name=collection_name, embedding_data=embeddingData)

def main():
    parser = argparse.ArgumentParser(description="Seed ChromaDB with embedded markdown content.")
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