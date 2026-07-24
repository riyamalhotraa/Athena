from fastapi import APIRouter
from pydantic import BaseModel

from services.analysis_service import analysis_service


router = APIRouter(
    prefix="/analysis",
    tags=["Analysis"]
)


class AnalysisRequest(BaseModel):
    dataset_id: str


@router.post("/start")
def start_analysis(request: AnalysisRequest):

    return analysis_service.start_analysis(request.dataset_id)

@router.get("/dashboard")
def get_dashboard():
    return analysis_service.get_dashboard_stats()