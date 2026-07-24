from fastapi import APIRouter
from pydantic import BaseModel
import os
from agents.chat_agent import chat_agent
from services.analysis_service import analysis_service


router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


class ChatRequest(BaseModel):
    dataset_id: str
    message: str


@router.post("/")
def chat(request: ChatRequest):

    print("\n========== CHAT ==========")
    print("Requested:", request.dataset_id)
    print("Available:", list(analysis_service.states.keys()))
    print("==========================\n")

    # Get stored AthenaState
    state = analysis_service.get_state(
        request.dataset_id
    )

    # Execute chat
    response = chat_agent(
        request.message,
        state
    )

    print("=" * 80)
    print("REPORT LENGTH:", len(response.get("report_text", "")))
    print("REPORT EXISTS:", bool(response.get("report")))
    print("REPORT TEXT:")
    print(response.get("report_text"))
    print("=" * 80)

    print("\n========== CHAT AGENT RESPONSE ==========")
    print(type(response))
    print(response)
    print("=========================================\n")

    state = response

    # Save updated state
    analysis_service.save_state(
        request.dataset_id,
        response
    )

    plot_url = None

    if response.get("plot"):
        filename = os.path.basename(response["plot"])
        plot_url = f"http://localhost:8000/plots/{filename}"

    print(response.keys())

    if "response" in response:
        return {
            "success": False,
            "response": response["response"]
        }

    return {
        "success": True,
        "message": response.get(
            "chat_response",
            "Analysis completed successfully."
        ),

        "summary": response["summary"],
        "preview": response["summary"]["sample_rows"],

        "rows": response["rows"],
        "columns": response["columns"],

        "report": response["report"],
        "report_text": response["report_text"],

        "plots": response["plots"],
        "model_results": response["model_results"],
        "target": response["target"],
        "cleaning": response["cleaning"],
        "preprocessing": response["preprocessing"],
        "plot": plot_url
    }