import json
import os

from dotenv import load_dotenv
from langchain_groq import ChatGroq

from state import AthenaState

load_dotenv()

llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    api_key=os.getenv("GROQ_API_KEY"),
    temperature=0,
)


def answer_question(state:AthenaState,question:str)->str:
    """
    Answer questions about the completed Athena pipeline.

    This function NEVER sends the dataframe,
    trained model or sklearn objects to the LLM.
    """

    context={
        "dataset": {
            "file_name":state.get("file_name"),
            "rows":state.get("rows"),
            "columns":state.get("columns"),
        },

        "summary":state.get("summary"),
        "target":state.get("target"),
        "cleaning":state.get("cleaning"),
        "preprocessing":state.get("preprocessing"),
        "model_results":state.get("model_results"),
        "report":state.get("report"),
    }

    prompt = f"""
You are Athena,
an Autonomous AI Data Scientist.

Answer ONLY using the supplied context.

If the information is unavailable,
reply exactly with:

"I don't have enough information yet."

Rules:

- Never hallucinate.
- Never invent statistics.
- Never guess model performance.
- Never mention unavailable information.
- Keep answers concise.
- Be technically accurate.

Context:

{json.dumps(context, indent=2)}

Question:

{question}
"""

    response = llm.invoke(prompt)

    return response.content