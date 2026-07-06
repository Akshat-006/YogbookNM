import cloudinary
import cloudinary.uploader
from fastapi import HTTPException

from core.config import settings

cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET,
)


async def upload_image(file):
    if not all([
        settings.CLOUDINARY_CLOUD_NAME,
        settings.CLOUDINARY_API_KEY,
        settings.CLOUDINARY_API_SECRET,
    ]):
        raise HTTPException(status_code=500, detail="Cloudinary credentials are not configured")

    if file.content_type not in {"image/jpeg", "image/jpg", "image/png", "image/webp"}:
        raise HTTPException(status_code=400, detail="Unsupported file type. Upload a PNG, JPG, or WEBP image.")

    try:
        result = cloudinary.uploader.upload(
            file.file,
            folder="yogbook",
            use_filename=True,
            unique_filename=True,
            resource_type="image"
        )
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc

    return {
        "url": result["secure_url"],
        "public_id": result["public_id"],
        "format": result.get("format"),
        "width": result.get("width"),
        "height": result.get("height"),
    }

async def delete_image(public_id: str):
    if not all([
        settings.CLOUDINARY_CLOUD_NAME,
        settings.CLOUDINARY_API_KEY,
        settings.CLOUDINARY_API_SECRET,
    ]):
        raise HTTPException(status_code=500, detail="Cloudinary credentials are not configured")

    try:
        result = cloudinary.uploader.destroy(public_id)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc

    return result