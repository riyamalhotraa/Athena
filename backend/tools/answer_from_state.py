from state import AthenaState
from langchain_groq import ChatGroq
from langchain_litellm import ChatLiteLLM

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


def answer_from_state(
    state: AthenaState,
    question: str,
) -> AthenaState:
    """
    Answers the user's question using only the existing AthenaState.
    """

    if not question.strip():
        state["chat_response"] = "No question was provided."
        return state

    # Optional: keep the latest question in the state
    state["question"] = question

    prompt = f"""
You are Athena, an AI Data Scientist.

You have already completed an analysis of a dataset.

Your task is to answer the user's question using ONLY the analysis state provided below.

Rules:
- Do NOT make up information.
- Do NOT assume anything that is not explicitly present.
- If the answer cannot be determined from the analysis state, respond exactly:
"I need to inspect the dataset to answer that."

---------------- ANALYSIS STATE ----------------

Dataset Summary:
{state.get("summary")}

Cleaning Steps:
{state.get("cleaning")}

Preprocessing:
{state.get("preprocessing")}

Target Column:
{state.get("target")}

Model Results:
{state.get("model_results")}

Analysis Report:
{state.get("report_text")}

------------------------------------------------

User Question:
{question}
"""

    response = llm.invoke(prompt)

    state["chat_response"] = response.content.strip()

    return state