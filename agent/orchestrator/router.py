import os
from typing import Any, Dict, List
from google.adk.agents import LlmAgent
from google.genai import types

class RouterAgent(LlmAgent):
    """Orchestration Router Agent that analyzes incoming user messages
    and dynamically delegates them to specific functional sub-agents.
    """
    def __init__(self):
        super().__init__(
            name="signal_router_agent",
            model="gemma-4-31b-it", 
            instruction=(
                "You are the master routing gateway for a multi-agent system. "
                "Analyze the user's intent and categorize it into exactly one of these buckets:\n"
                "1. RECOVERY (if they talk about returning, resuming, or picking up where they left off)\n"
                "2. SAFETY (if they express negative emotions or need a safe boundary check)\n"
                "3. THREADING/CAPTURE (for general thoughts, ideas, or linking notes).\n\n"
                "Respond by identifying the correct bucket and providing an appropriate guiding response."
            )
        )

    async def call_async(self, context: Any, *args: Any, **kwargs: Any) -> Any:
        """Intercepts the framework invocation context and safely monitors metrics."""
        incoming_payload = getattr(context, 'message', getattr(context, 'new_message', None))
        
        user_text = ""
        if incoming_payload and hasattr(incoming_payload, 'parts') and incoming_payload.parts:
            for part in incoming_payload.parts:
                if hasattr(part, 'text') and part.text:
                    user_text = part.text
                    break
        elif isinstance(incoming_payload, str):
            user_text = incoming_payload

        # Log intercept markers cleanly in your console without altering payload properties
        if any(trigger in user_text.lower() for trigger in ["resume", "i am back", "i'm back"]):
            session_id = getattr(context, 'session_id', 'unknown_session')
            print(f"\n⚡ [ORCHESTRATOR INTERCEPT] -> Resume Intent for Session: '{session_id}'")
            print("📦 [MEMORY FETCH] -> Syncing recorded historical entries...")

        return await super().call_async(context, *args, **kwargs)