# Run using:
# uvicorn main:app --reload

import os
from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from routes.analysis import router as analysis_router
from agents.graph import athena_graph
from routes.datasets import router as datasets_router
from routes.chat import router as chat_router
from fastapi.staticfiles import StaticFiles



# -------------------------------------------------
# FastAPI App
# -------------------------------------------------

app = FastAPI(
    title="Athena API",
    description="Backend API for Athena - Autonomous AI Data Scientist",
    version="1.0.0"
)

app.mount("/plots", StaticFiles(directory="plots"), name="plots")

# -------------------------------------------------
# CORS
# -------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount(
    "/plots",
    StaticFiles(directory="plots"),
    name="plots"
)
# -------------------------------------------------
# Register Routers
# -------------------------------------------------

app.include_router(datasets_router)
app.include_router(analysis_router)
app.include_router(chat_router)

from fastapi.routing import APIRoute

for route in app.routes:
    if isinstance(route, APIRoute):
        print(route.methods, route.path)

# -------------------------------------------------
# Request Models
# -------------------------------------------------

class AnalyzeRequest(BaseModel):
    file_path: str

# -------------------------------------------------
# Home Route
# -------------------------------------------------

@app.get("/")
def home():
    return {
        "message": "Athena Backend Running 🚀"
    }

# -------------------------------------------------
# Analyze Dataset
# -------------------------------------------------

@app.post("/analyze")
def analyze(request: AnalyzeRequest):

    if not os.path.exists(request.file_path):
        raise HTTPException(
            status_code=404,
            detail="Dataset not found."
        )

    state = {
        "success": True,
        "error": None,
        "file_path": request.file_path
    }

    result = athena_graph.invoke(state)

    return {
        "success": True,
        "report": result.get("report_text", ""),
        "plots": result.get("plots", []),
        "error": result.get("error", None)
    }