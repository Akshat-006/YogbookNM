"""
Database connection module.
Handles asynchronous MongoDB connection using Motor with singleton pattern.
"""

from motor.motor_asyncio import AsyncIOMotorClient
from core.config import settings
import logging

logger = logging.getLogger(__name__)

# Global database client and database instance
_client: AsyncIOMotorClient = None
_database = None


async def connect_to_mongo() -> None:
    """
    Create a single MongoDB client instance and connect to the database.
    Should be called on application startup.
    """
    global _client, _database
    if _client is None:
        logger.info("Connecting to MongoDB...")
        _client = AsyncIOMotorClient(settings.MONGODB_URL)
        _database = _client[settings.MONGODB_DB]
        # Verify connection
        try:
            await _client.admin.command('ping')
            logger.info("Successfully connected to MongoDB!")
        except Exception as e:
            logger.error(f"Failed to connect to MongoDB: {e}")
            raise
    else:
        logger.info("MongoDB connection already established.")


async def close_mongo_connection() -> None:
    """
    Close the MongoDB client connection.
    Should be called on application shutdown.
    """
    global _client
    if _client:
        logger.info("Closing MongoDB connection...")
        _client.close()
        _client = None
        logger.info("MongoDB connection closed.")


def get_database():
    """
    Dependency to get the database instance.
    Raises an error if the database connection hasn't been initialized.
    """
    if _database is None:
        raise RuntimeError("Database not initialized. Call connect_to_mongo() first.")
    return _database