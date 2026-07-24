import os
from dotenv import load_dotenv
from litellm import Router

load_dotenv()

model_list = [
    {
        "model_name": "athena-llm",
        "litellm_params": {
            "model": "openrouter/openai/gpt-4o-mini",
            "api_key": os.getenv("OPENROUTER_API_KEY"),
        },
        "model_info": {"id": "gpt4o-mini"},
    },
    {
        "model_name": "athena-llm",
        "litellm_params": {
            "model": "groq/llama-3.3-70b-versatile",
            "api_key": os.getenv("GROQ_API_KEY"),
        },
        "model_info": {"id": "llama-70b"},
    },
    {
        "model_name": "athena-llm",
        "litellm_params": {
            "model": "gemini/gemini-2.5-flash",
            "api_key": os.getenv("GEMINI_API_KEY"),
        },
        "model_info": {"id": "gemini-2.5-flash"},
    },
]

router = Router(
    model_list=model_list,
    routing_strategy="least-busy",
)