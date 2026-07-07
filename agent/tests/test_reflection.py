import asyncio
import os
import sys

# Dynamically add the root signal-workspace directory to Python's search path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.genai import types

from agent.agents.reflection import reflection_agent
from agent.initialize import init_memory  # <-- ADD THIS IMPORT


async def main():
    # --- ADD THIS LINE TO INITIALIZE THE MEMORY DISCOVERY LAYER ---
    init_memory()

    session_service = InMemorySessionService()
    await session_service.create_session(
        user_id="test_user", session_id="ref_1", app_name="signal_reflection_app"
    )

    runner = Runner(
        agent=reflection_agent,
        session_service=session_service,
        app_name="signal_reflection_app",
    )

    message = "Review my recent entries about computational physics workflows and analyze structural patterns."
    print("User:", message)

    async for event in runner.run_async(
        user_id="test_user",
        session_id="ref_1",
        new_message=types.Content(
            role="user", parts=[types.Part.from_text(text=message)]
        ),
    ):
        if event.is_final_response() and event.content and event.content.parts:
            for part in event.content.parts:
                if hasattr(part, "text"):
                    print(part.text)


if __name__ == "__main__":
    asyncio.run(main())