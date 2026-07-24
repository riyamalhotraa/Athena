# python -m agents.test_chat
import json

from langchain_core.prompts import ChatPromptTemplate
from langchain_litellm import ChatLiteLLM

from agents.action import Action
from agents.tool_registry import TOOL_REGISTRY


# ---------------- LLM ---------------- #

primary = ChatLiteLLM(
    model_name="groq/llama-3.3-70b-versatile"
)

fallback = ChatLiteLLM(
    model_name="gemini/gemini-2.5-flash"
)

fallback2 = ChatLiteLLM(
    model_name="openrouter/openai/gpt-4o-mini"
)

llm = primary.with_fallbacks([
    fallback,
    fallback2
])


# ---------------- Prompt Builder ---------------- #

def build_tool_prompt() -> str:

    prompt = """
You are Athena's Tool Intent Router.

Your task is to identify which tool the user wants.

Return ONLY valid JSON.

Example output:

{{
  "tool": "plot_histogram",
  "parameters": {{
      "column": "Age"
  }}
}}

Rules:

- Never explain.
- Never use markdown.
- Never answer in English.
- Use ONLY the available tools.
- Infer parameters whenever possible.
- Return JSON only.

=========================
AVAILABLE TOOLS
=========================
"""

    for tool_name, info in TOOL_REGISTRY.items():

        prompt += f"\nTool: {tool_name}\n"
        prompt += f"Description: {info['description']}\n"

        if info["parameters"]:
            prompt += "Parameters:\n"

            for name, param in info["parameters"].items():

                if isinstance(param, dict):
                    description = param.get("description", "")
                    param_type = param.get("type", "any")
                    prompt += f"- {name} ({param_type}): {description}\n"

                else:
                    prompt += f"- {name}: {param}\n"

        else:
            prompt += "Parameters: None\n"

        prompt += "\n"

    return prompt


SYSTEM_PROMPT = build_tool_prompt()


# ---------------- Router ---------------- #

def route(user_message: str) -> Action:

    prompt = ChatPromptTemplate.from_messages(
        [
            ("system", SYSTEM_PROMPT),
            ("human", "{message}")
        ]
    )

    chain = prompt | llm

    response = chain.invoke(
        {
            "message": user_message
        }
    )

    print("\n===== RAW LLM RESPONSE =====")
    print(response.content)
    print("============================\n")

    try:

        data = json.loads(response.content)

        return Action.model_validate(data)

    except Exception as e:

        raise ValueError(
            f"""
        Router returned invalid JSON.

        Raw Response:

        {response.content}
        """
        ) from e