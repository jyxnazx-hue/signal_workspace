import networkx as nx
import json
from typing import List, Tuple
import os

class GraphStore:
    def __init__(self, file_path: str):
        self.file_path = file_path
        self.graph = nx.Graph()
        self._load()

    def _load(self):
        if os.path.exists(self.file_path):
            with open(self.file_path, 'r') as f:
                data = json.load(f)
                self.graph = nx.node_link_graph(data)
        else:
            os.makedirs(os.path.dirname(self.file_path), exist_ok=True)

    def save(self):
        data = nx.node_link_data(self.graph)
        with open(self.file_path, 'w') as f:
            json.dump(data, f, indent=2)

    def add_link(self, entry_id_1: str, entry_id_2: str, weight: float = 1.0):
        self.graph.add_edge(entry_id_1, entry_id_2, weight=weight)
        self.save()

    def get_linked_entries(self, entry_id: str) -> List[str]:
        if entry_id in self.graph:
            return list(self.graph.neighbors(entry_id))
        return []

    def get_graph_data(self):
        # For visualization or analysis
        return nx.node_link_data(self.graph)