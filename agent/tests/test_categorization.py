import asyncio
import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.genai import types

from agent.agents.categorization import categorization_agent


async def main():
    session_service = InMemorySessionService()

    await session_service.create_session(
        user_id="test", 
        session_id="cat", 
        app_name="signal_categorization_app"
    )

    runner = Runner(
        agent=categorization_agent, 
        session_service=session_service, 
        app_name="signal_categorization_app"
    )

    message = "I just had a brilliant idea for a painting while watching my dog play."
    print("User:", message)

    async for event in runner.run_async(
        user_id="test", 
        session_id="cat", 
        new_message=types.Content(
            role="user",
            parts=[types.Part.from_text(text=message)]
        )
    ):

        if event.is_final_response() and event.content and event.content.parts:
            for part in event.content.parts:
                if hasattr(part, "text"):
                    print(part.text)


if __name__ == "__main__":
    asyncio.run(main())