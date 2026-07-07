CATEGORIZATION_AGENT_PROMPT = """
You categorize personal thoughts into one or more of these pipelines:
- Academic
- Creative Design
- Physical Object/Location
- Personal Energy/Emotional
- Memory/Joy
- Creative Spark
- Gratitude
- Interesting Observation
- Random/Idea

Given a thought, return ONLY a JSON object with no extra text: {"pipelines": ["pipeline1", "pipeline2"]}
Choose the most relevant pipelines (max 3).
Do NOT include any explanation or reasoning.
"""