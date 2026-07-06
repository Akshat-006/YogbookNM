"""
Application configuration module.
Loads environment variables and provides settings for the FastAPI app.
"""

import os
import secrets
from typing import List, Union


def _load_env_file(env_path: str) -> None:
    """
    Minimal .env loader (no external deps).
    Loads KEY=VALUE lines into os.environ if not already set.
    Ignores blank lines and comments starting with '#'.
    """
    if not os.path.exists(env_path):
        return

    with open(env_path, "r", encoding="utf-8") as f:
        for raw_line in f:
            line = raw_line.strip()
            if not line or line.startswith("#"):
                continue
            if "=" not in line:
                continue
            key, value = line.split("=", 1)
            key = key.strip()
            value = value.strip().strip("\"'")

            # Do not override real environment variables
            os.environ.setdefault(key, value)


# Load backend/.env by default (so `backend/test_connection.py` works out of the box)
_load_env_file(os.path.join(os.path.dirname(__file__), "..", ".env"))


def _assemble_cors_origins(v: Union[str, List[str], None]) -> List[str]:
    """
    Supports:
      - empty / None => []
      - "http://a,http://b" => ["http://a", "http://b"]
      - ["http://a","http://b"] => ["http://a","http://b"]
      - JSON-like strings (e.g. '["http://a"]') are returned as-is since we
        can't depend on extra JSON parsing conventions here.
    """
    if v is None:
        return []
    if isinstance(v, list):
        return [str(i) for i in v]
    if isinstance(v, str):
        s = v.strip()
        if not s:
            return []
        # simple comma-separated format
        if not s.startswith("["):
            return [i.strip() for i in s.split(",") if i.strip()]
        return [s]
    return []


class Settings:
    # Project metadata
    PROJECT_NAME: str = os.getenv("PROJECT_NAME", "Yogbook")
    API_V1_STR: str = os.getenv("API_V1_STR", "/api/v1")

    # Security
    SECRET_KEY: str = os.getenv("SECRET_KEY", secrets.token_urlsafe(32))
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(
        os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", str(60 * 24 * 8))
    )

    # Database
    MONGODB_URL: str = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
    # Note: project expects MONGODB_DB (not MONGODB_DATABASE)
    MONGODB_DB: str = os.getenv("MONGODB_DB", "yogbook")

    # CORS
    BACKEND_CORS_ORIGINS: List[str] = _assemble_cors_origins(
        os.getenv("BACKEND_CORS_ORIGINS")
    )

    # Email
    SMTP_HOST = os.getenv("SMTP_HOST")
    SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
    SMTP_EMAIL = os.getenv("SMTP_EMAIL")
    SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
    SMTP_FROM = os.getenv("SMTP_FROM")

    # Razorpay
    RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID")
    RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET")
    RAZORPAY_WEBHOOK_SECRET = os.getenv("RAZORPAY_WEBHOOK_SECRET")

    # Google Calendar
    GOOGLE_SERVICE_ACCOUNT = os.getenv("GOOGLE_SERVICE_ACCOUNT")
    GOOGLE_CALENDAR_ID = os.getenv("GOOGLE_CALENDAR_ID")

    # Default Appointment Meet Link
    DEFAULT_APPOINTMENT_MEET_LINK = os.getenv(
    "DEFAULT_APPOINTMENT_MEET_LINK"
    )

    #Claudinary: Image
    CLOUDINARY_CLOUD_NAME = os.getenv("CLOUDINARY_CLOUD_NAME")
    CLOUDINARY_API_KEY = os.getenv("CLOUDINARY_API_KEY")
    CLOUDINARY_API_SECRET = os.getenv("CLOUDINARY_API_SECRET")



settings = Settings()


