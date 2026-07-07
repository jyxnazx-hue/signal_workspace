# agent/initialize.py
from agent.memory.server import create_memory_server
from dotenv import load_dotenv
load_dotenv()

def init_memory():
    server = create_memory_server()
    print("Memory server initialized successfully.")
    return server

if __name__ == "__main__":
    init_memory()