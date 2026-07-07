import asyncio
import os
import sys

# Dynamically add the root signal-workspace directory to Python's search path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.genai import types

from agent.agents.recovery import recovery_agent
from agent.initialize import init_memory


async def main():
    # Initialize your memory server layer
    init_memory()

    # Spin up the session manager service
    session_service = InMemorySessionService()

    # Pre-create the session with the explicit app context mapping
    await session_service.create_session(
        user_id="test_user", 
        session_id="s1", 
        app_name="signal_recovery_app"
    )

    # Initialize the Runner with the required app_name boundary context
    runner = Runner(
        agent=recovery_agent,
        session_service=session_service,
        app_name="signal_recovery_app",
    )

    # --- Test 1: Save a session ---
    print("--- Save test ---")
    async for event in runner.run_async(
        user_id="test_user",
        session_id="s1",
        new_message=types.Content(
            role="user",
            parts=[
                types.Part.from_text(
                    text="I'm working on the HPC intro and I'm tired, I'll come back later."
                )
            ],
        ),
    ):
        if event.is_final_response() and event.content and event.content.parts:
            for part in event.content.parts:
                if hasattr(part, "text"):
                    print(part.text)

    # Add a tiny cooldown to prevent rapid-fire asynchronous conflicts
    await asyncio.sleep(2)

    # --- Test 2: Resume ---
    print("\n--- Resume test ---")
    async for event in runner.run_async(
        user_id="test_user",
        session_id="s1",
        new_message=types.Content(
            role="user",
            parts=[types.Part.from_text(text="I'm back, can you resume?")],
        ),
    ):
        if event.is_final_response() and event.content and event.content.parts:
            for part in event.content.parts:
                if hasattr(part, "text"):
                    print(part.text)


if __name__ == "__main__":
    asyncio.run(main())