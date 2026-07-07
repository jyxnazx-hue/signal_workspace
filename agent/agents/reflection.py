from google.adk.agents import LlmAgent
from . import reflection_prompt
from ..tools.adk_memory_tools import get_memory_tools

MODEL = "gemma-4-31b-it"

reflection_agent = LlmAgent(
    name="reflection_agent",
    model=MODEL,
    description="Surfaces joyful memories and detects patterns across thoughts.",
    instruction=reflection_prompt.REFLECTION_AGENT_PROMPT,
    tools=get_memory_tools(),
    output_key="reflection_result",
)