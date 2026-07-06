import cloudinary
import cloudinary.uploader

from core.config import settings

cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET,
)


async def upload_image(file):

    result = cloudinary.uploader.upload(

        file.file,

        folder="yogbook"

    )

    return {

        "url": result["secure_url"],

        "public_id": result["public_id"]

    }

async def delete_image(public_id: str):

    result = cloudinary.uploader.destroy(
        public_id
    )

    return result