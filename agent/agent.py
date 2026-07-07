from google.adk.agents import LlmAgent
from google.adk.tools.agent_tool import AgentTool
from google.genai import types

# Define the target operational model
MODEL = "gemma-4-31b-it"

# Construct the master orchestrator conforming to strict Pydantic validation
signal_root_agent = LlmAgent(
    name="signal_root_agent",
    model=MODEL,
    description="Orchestrates thought capture, organization, and resurfacing.",
    # We will use a fallback prompt string directly here to keep it self-contained
    instruction="You are the master orchestrator agent. Coordinate thought capture, memory organization, and semantic link creation.",
    tools=[], 
    output_key="signal_response",
    # Clean, fully validated configuration layout (no extra inputs)
    generate_content_config=types.GenerateContentConfig(
        temperature=0.2,
        max_output_tokens=2000
    )
)

# Essential variable handoff for the ADK module discovery engine
root_agent = signal_root_agent