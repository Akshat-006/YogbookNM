"""
Application configuration module.
Loads environment variables and provides settings for the FastAPI app.
"""

from pydantic import BaseSettings, PostgresDsn, validator
from typing import List, Union
import secrets

class Settings(BaseSettings):
    # Project metadata
    PROJECT_NAME: str = "Yogbook"
    API_V1_STR: str = "/api/v1"

    # Security
    SECRET_KEY: str = secrets.token_urlsafe(32)
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days

    # Database
    MONGODB_URL: str = "mongodb://localhost:27017"
    MONGODB_DB: str = "yogbook"

    # CORS
    BACKEND_CORS_ORIGINS: List[Union[str, PostgresDsn]] = []

    @validator("BACKEND_CORS_ORIGINS", pre=True)
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> Union[List[str], str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()