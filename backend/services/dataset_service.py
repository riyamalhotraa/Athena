import os
import shutil
import uuid

from fastapi import UploadFile, HTTPException


class DatasetService:
    def __init__(self):
        self.upload_dir = "uploads"
        os.makedirs(self.upload_dir, exist_ok=True)

    async def upload_dataset(self, file: UploadFile):

        if not (
            file.filename.endswith(".csv")
            or file.filename.endswith(".xlsx")
            or file.filename.endswith(".xls")
        ):
            raise HTTPException(
                status_code=400,
                detail="Only CSV and Excel files are allowed."
            )

        filename = f"{uuid.uuid4()}_{file.filename}"

        file_path = os.path.join(self.upload_dir, filename)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        normalized_path = file_path.replace("\\", "/")

        return {
            "success": True,
            "dataset_id": normalized_path,
            "file_path": normalized_path,
            "filename": file.filename
        }


dataset_service = DatasetService()