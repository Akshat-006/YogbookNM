"""
Test script to verify MongoDB connection using the same configuration as the app.
Run this script to check if the backend can connect to MongoDB.
"""

import asyncio
import logging
import os
import sys

# Ensure `core` can be imported when running this file as:
#   python backend/test_connection.py
sys.path.append(os.path.dirname(__file__))

from core.database import connect_to_mongo, close_mongo_connection, get_database

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def test_connection():
    """Test the database connection."""
    try:
        await connect_to_mongo()
        db = get_database()
        # Perform a simple operation to verify the connection
        # List collection names (requires at least one collection to exist, but will not error if none)
        collections = await db.list_collection_names()
        logger.info(f"Connected to database. Collections: {collections}")
        # You can also try to insert a dummy document and then delete it for a full test
        # But for now, just listing collections is enough to verify the connection is alive.
        return True
    except Exception as e:
        logger.error(f"Connection test failed: {e}")
        return False
    finally:
        await close_mongo_connection()

if __name__ == "__main__":
    result = asyncio.run(test_connection())
    if result:
        logger.info("Connection test PASSED")
    else:
        logger.error("Connection test FAILED")
        exit(1)