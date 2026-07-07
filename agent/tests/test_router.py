import asyncio
import os
import sys

# Dynamically add the root signal-workspace directory to Python's search path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.genai import types

from agent.orchestrator.router import RouterAgent
from agent.initialize import init_memory


async def main():
    # 1. Initialize memory store boundaries
    init_memory()

    # 2. Build the state management session service
    session_service = InMemorySessionService()
    await session_service.create_session(
        user_id="u", 
        session_id="test", 
        app_name="signal_router_app"
    )

    # 3. Create the router agent
    agent = RouterAgent()

    # 4. Bind the Runner loop layout
    runner = Runner(
        agent=agent, 
        session_service=session_service,
        app_name="signal_router_app"
    )

    messages = [
        "I am working on HPC. Tired, will come back later.",
        "I am back, can you resume?",
        "I'm feeling down. Give me a joy dose.",
        "I saw a beautiful sunset.",
    ]

    for msg in messages:
        print(f"\nUser: {msg}")
        
        async for event in runner.run_async(
            user_id="u", 
            session_id="test", 
            new_message=types.Content(
                role="user",
                parts=[types.Part.from_text(text=msg)]
            )
        ):
            if event.is_final_response() and event.content and event.content.parts:
                for part in event.content.parts:
                    if hasattr(part, 'text'):
                        print(part.text)
                        
        await asyncio.sleep(1)


if __name__ == "__main__":
    asyncio.run(main())