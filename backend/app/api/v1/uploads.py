import os
import uuid
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from app.api import deps
from app.core.config import get_settings

settings = get_settings()
router = APIRouter()


def ensure_upload_dir():
    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)


@router.post("", response_class=JSONResponse)
def upload_file(
    file: UploadFile = File(...),
    current_user=Depends(deps.get_current_active_admin),
):
    ensure_upload_dir()
    filename = f"{uuid.uuid4().hex}{os.path.splitext(file.filename)[1]}"
    filepath = os.path.join(settings.UPLOAD_DIR, filename)
    try:
        with open(filepath, "wb") as buffer:
            buffer.write(file.file.read())
    except Exception:
        raise HTTPException(status_code=500, detail="Could not save file")
    url = f"{settings.BASE_URL}/uploads/{filename}"
    return {"url": url, "filename": filename}
