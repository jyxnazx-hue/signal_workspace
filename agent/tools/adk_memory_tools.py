from agent.memory import tools as memory_tools

def get_memory_tools():
    """Return plain Python functions for the memory system to use as tools."""
    return [
        memory_tools.store_entry,
        memory_tools.query_similar_entries,
        memory_tools.create_link,
        memory_tools.get_linked_entries,
        memory_tools.save_snapshot,
        memory_tools.load_latest_snapshot,
    ]