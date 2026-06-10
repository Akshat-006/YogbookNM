"""
Database connection module.
Handles asynchronous MongoDB connection using Motor.
"""

from motor.motor_asyncio import AsyncIOMotorClient
from core.config import settings

# Global database client and database instance
client: AsyncIOMotorClient = None
database = None

async def connect_to_mongo():
    global client, database
    client = AsyncIOMotorClient(settings.MONGODB_URL)
    database = client[settings.MONGODB_DB]
    # Optionally, you can ping the database to confirm connection
    # await database.command("ping")

async def close_mongo_connection():
    global client
    if client:
        client.close()

def get_database():
    return database