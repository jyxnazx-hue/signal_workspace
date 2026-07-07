from google.adk.agents import LlmAgent
from . import categorization_prompt

MODEL = "gemma-4-31b-it"

categorization_agent = LlmAgent(
    name="categorization_agent",
    model=MODEL,
    description="Assigns thought pipelines to a user entry.",
    instruction=categorization_prompt.CATEGORIZATION_AGENT_PROMPT,
    output_key="categorization_result",
)