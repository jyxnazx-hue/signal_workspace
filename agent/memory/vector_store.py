# pyrefly: ignore [missing-import]
import chromadb
# pyrefly: ignore [missing-import]
from chromadb.config import Settings
from sentence_transformers import SentenceTransformer
from typing import List, Dict, Any
import os


class VectorStore:
    def __init__(self, persist_dir: str, collection_name: str, model_name: str):
        self.client = chromadb.PersistentClient(path=persist_dir, settings=Settings(anonymized_telemetry=False))
        self.collection = self.client.get_or_create_collection(name=collection_name)
        self.embedder = SentenceTransformer(model_name)

    def add_entry(self, entry_id: str, text: str, metadata: Dict[str, Any] = None):
        embedding = self.embedder.encode(text).tolist()
        self.collection.add(
            ids=[entry_id],
            embeddings=[embedding],
            metadatas=[metadata or {}],
            documents=[text]
        )

    def query_similar(self, text: str, k: int = 5) -> List[Dict[str, Any]]:
        embedding = self.embedder.encode(text).tolist()
        results = self.collection.query(
            query_embeddings=[embedding],
            n_results=k,
            include=["metadatas", "documents", "distances"]
        )
        # Flatten results
        entries = []
        if results['ids']:
            for i in range(len(results['ids'][0])):
                entries.append({
                    "id": results['ids'][0][i],
                    "text": results['documents'][0][i],
                    "metadata": results['metadatas'][0][i],
                    "distance": results['distances'][0][i]
                })
        return entries