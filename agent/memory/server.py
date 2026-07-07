# agent/memory/server.py
"""
MCP Memory Server for Signal.
Initializes the vector store, graph store, and snapshot directory,
then registers all memory tools using the official MCP decorator pattern.
"""

import os
from dotenv import load_dotenv
from mcp.server.fastmcp import FastMCP

from . import tools
from .vector_store import VectorStore
from .graph_store import GraphStore
from agent.models.entry import Entry, Snapshot

# Load environment variables from agent/.env
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

def create_memory_server() -> FastMCP:
    """
    Create and configure the MCP memory server.
    Initializes vector store, graph store, and snapshot directory.
    """
    persist_dir = os.getenv("CHROMA_PERSIST_DIR", "./chroma_data")
    collection_name = os.getenv("CHROMA_COLLECTION_NAME", "signal_entries")
    model_name = os.getenv("EMBEDDING_MODEL", "all-MiniLM-L6-v2")
    graph_path = os.getenv("GRAPH_DB_PATH", "./graph_data/links.json")
    snapshot_dir = os.getenv("SNAPSHOT_DB_PATH", "./snapshots/")

    # Initialize the memory stores and attach them to the tools module
    tools.vector_store = VectorStore(persist_dir, collection_name, model_name)
    tools.graph_store = GraphStore(graph_path)
    tools.SNAPSHOT_DIR = snapshot_dir

    os.makedirs(snapshot_dir, exist_ok=True)

    # Create the MCP server
    server = FastMCP("signal-memory")

    # Register tools using the decorator pattern
    @server.tool()
    async def store_entry(entry: tools.Entry) -> str:
        return await tools.store_entry(entry)

    @server.tool()
    async def query_similar_entries(text: str, k: int = 5) -> list:
        return await tools.query_similar_entries(text, k)

    @server.tool()
    async def create_link(entry_id_1: str, entry_id_2: str, weight: float = 1.0) -> dict:
        return await tools.create_link(entry_id_1, entry_id_2, weight)

    @server.tool()
    async def get_linked_entries(entry_id: str) -> list:
        return await tools.get_linked_entries(entry_id)

    @server.tool()
    async def save_snapshot(snapshot: tools.Snapshot) -> str:
        return await tools.save_snapshot(snapshot)

    @server.tool()
    async def load_latest_snapshot() -> dict | None:
        return await tools.load_latest_snapshot()

    return server

if __name__ == "__main__":
    # Quick test: creates server but doesn't run it (that's done by an MCP client)
    memory_server = create_memory_server()
    print("Memory server created successfully.")