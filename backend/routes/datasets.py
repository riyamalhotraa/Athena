from fastapi import APIRouter, UploadFile, File

from services.dataset_service import dataset_service

router = APIRouter(
    prefix="/datasets",
    tags=["Datasets"]
)


@router.post("/upload")
async def upload_dataset(file: UploadFile = File(...)):
    return await dataset_service.upload_dataset(file)