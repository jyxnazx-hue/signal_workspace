"""
Test the Threading Agent.
Pre-stores a seed entry, then sends a new entry with ID and text.
The agent should link them.
"""
import asyncio
from google.adk.sessions import InMemorySessionService
from google.adk.runners import Runner
from agent.agents.threading import threading_agent
from agent.initialize import init_memory
from agent.models.entry import Entry
from agent.memory.tools import store_entry

async def main():
    init_memory()

    # Store a seed entry
    seed = Entry(text="I love sunsets. They make me feel grateful.", pipelines=["Memory/Joy"])
    await store_entry(seed)

    # Create a new entry and store it (so it has an ID)
    new_entry = Entry(text="Saw a beautiful sunset today and felt grateful.", pipelines=["Memory/Joy"])
    await store_entry(new_entry)

    # Now test the threading agent with the new entry's data
    session_service = InMemorySessionService()
    runner = Runner(agent=threading_agent, session_service=session_service)

    message = f"New entry ID: {new_entry.id}\nText: {new_entry.text}"
    print("Message to agent:\n", message)

    async for event in runner.run_async(
        user_id="test", session_id="thread",
        new_message=message
    ):
        if event.is_final_response():
            for part in event.content.parts:
                if hasattr(part, 'text'):
                    print("\nThreading Agent:", part.text)

if __name__ == "__main__":
    asyncio.run(main())