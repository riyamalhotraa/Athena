import json
import os

from dotenv import load_dotenv
from langchain_core.messages import HumanMessage
from langchain_groq import ChatGroq

from state import AthenaState

load_dotenv()

llm=ChatGroq(
    model="llama-3.3-70b-versatile",
    api_key=os.getenv("GROQ_API_KEY"),
    temperature=0,
)


def detect_target(state:AthenaState)->AthenaState:
    """Detect the most likely target column in the dataset. Use only the dataset summary, never the full dataframe."""

    if not state.get("success",False):
        return state

    summary=state["summary"]

    prompt=f"""
    You are Athena's Target Detection Expert.

    Determine the most likely target column for a machine learning task.

    Dataset Information
    -------------------

    Columns:
    {summary["column_names"]}

    Data Types:
    {summary["data_types"]}

    Unique Values:
    {summary["unique_values"]}

    Sample Rows:
    {summary["sample_rows"]}

    Dataset Shape:
    Rows: {summary["rows"]}
    Columns: {summary["columns"]}

    Instructions:

    1. Infer the most likely target column.
    2. Determine whether the problem is:
    - classification
    - regression
    - clustering
    - unknown
    3. Give a confidence score (0-100).
    4. Briefly explain your reasoning.
    5. Never choose obvious identifier columns
    (ID, PassengerId, CustomerID, etc.)
    6. If no clear target exists, return null.

    Return ONLY valid JSON.

    Example:

    {{
        "target_column": "Survived",
        "problem_type": "classification",
        "confidence": 97,
        "reasoning": "Survived is a binary outcome variable."
    }}
    """

    try:
        response=llm.invoke([HumanMessage(content=prompt)])

        content=response.content.strip()
        content=(content.replace("```json","").replace("```","").strip())

        result=json.loads(content)
        state["target"]=result

        print("="*60)
        print("🎯 Target Detection Completed")
        print(f"Target      : {result.get('target_column')}")
        print(f"Problem     : {result.get('problem_type')}")
        print(f"Confidence  : {result.get('confidence')}%")
        print("="*60)

    except Exception as e:

        state["target"]={
            "target_column":None,
            "problem_type":"unknown",
            "confidence":0,
            "reasoning":str(e),
        }

    return state