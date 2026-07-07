from google.adk.agents import LlmAgent
from . import recovery_prompt
from ..tools.adk_memory_tools import get_memory_tools

MODEL = "gemma-4-31b-it"

recovery_agent = LlmAgent(
    name="recovery_agent",
    model=MODEL,
    description="Saves and restores mental state snapshots.",
    instruction=recovery_prompt.RECOVERY_AGENT_PROMPT,
    tools=get_memory_tools(),
    output_key="recovery_result",
)