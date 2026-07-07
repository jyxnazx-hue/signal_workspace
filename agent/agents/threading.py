from google.adk.agents import LlmAgent
from . import threading_prompt
from ..tools.adk_memory_tools import get_memory_tools

MODEL = "gemma-4-31b-it"

threading_agent = LlmAgent(
    name="threading_agent",
    model=MODEL,
    description="Links new thoughts to semantically similar past entries.",
    instruction=threading_prompt.THREADING_AGENT_PROMPT,
    tools=get_memory_tools(),
    output_key="threading_result",
)