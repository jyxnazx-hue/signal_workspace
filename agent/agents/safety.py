from google.adk.agents import LlmAgent
from . import safety_prompt

MODEL = "gemma-4-31b-it"

safety_agent = LlmAgent(
    name="safety_agent",
    model=MODEL,
    description="Checks user thoughts for privacy, safety, and emotional tone.",
    instruction=safety_prompt.SAFETY_AGENT_PROMPT,
    output_key="safety_result",
)