# agent/memory/tools.py
"""
MCP Tool functions for Signal's memory system.
These are plain async functions that will be registered with the MCP server.
"""

import os
import json
from typing import Optional, List, Dict, Any
from ..models.entry import Entry, Snapshot

# These global variables will be set by the MCP server during initialization
vector_store = None
graph_store = None
SNAPSHOT_DIR = None

async def store_entry(entry: Entry) -> str:
    """
    Store a new thought entry in the vector database.
    """
    if vector_store is None:
        raise RuntimeError("Memory system not initialized. Vector store is missing.")
    
    vector_store.add_entry(
        entry_id=entry.id,
        text=entry.text,
        metadata={
            "timestamp": entry.timestamp.isoformat(),
            "pipelines": ",".join(entry.pipelines),
            "source": entry.source
        }
    )
    return entry.id


async def query_similar_entries(text: str, k: int = 5) -> List[Dict[str, Any]]:
    """
    Retrieve the top-k most similar past entries to the given text.
    """
    if vector_store is None:
        raise RuntimeError("Memory system not initialized. Vector store is missing.")
    
    return vector_store.query_similar(text, k)


async def create_link(entry_id_1: str, entry_id_2: str, weight: float = 1.0) -> Dict[str, Any]:
    """
    Create a bidirectional link between two entries in the knowledge graph.
    """
    if graph_store is None:
        raise RuntimeError("Memory system not initialized. Graph store is missing.")
    
    graph_store.add_link(entry_id_1, entry_id_2, weight)
    return {
        "status": "linked",
        "from": entry_id_1,
        "to": entry_id_2,
        "weight": weight
    }


async def get_linked_entries(entry_id: str) -> List[str]:
    """
    Get all entry IDs that are linked to the given entry.
    """
    if graph_store is None:
        raise RuntimeError("Memory system not initialized. Graph store is missing.")
    
    return graph_store.get_linked_entries(entry_id)


async def save_snapshot(snapshot: Snapshot) -> str:
    """
    Save a mental state snapshot to disk for later recovery.
    """
    if SNAPSHOT_DIR is None:
        raise RuntimeError("Snapshot directory not configured.")
    
    os.makedirs(SNAPSHOT_DIR, exist_ok=True)
    file_path = os.path.join(SNAPSHOT_DIR, f"{snapshot.id}.json")
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(snapshot.model_dump_json(indent=2))
    
    return snapshot.id


async def load_latest_snapshot() -> Optional[Snapshot]:
    """
    Load the most recent snapshot from disk.
    """
    if SNAPSHOT_DIR is None or not os.path.exists(SNAPSHOT_DIR):
        return None
    
    snapshot_files = [
        os.path.join(SNAPSHOT_DIR, f)
        for f in os.listdir(SNAPSHOT_DIR)
        if f.endswith('.json')
    ]
    
    if not snapshot_files:
        return None
    
    snapshot_files.sort(key=os.path.getmtime, reverse=True)
    latest_file = snapshot_files[0]
    
    with open(latest_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    return Snapshot(**data)