import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL", "mongodb://3.91.173.4:27017")

client = AsyncIOMotorClient(MONGO_URL)

database = client.bank_db

customer_collection = database.get_collection("customers")
account_collection = database.get_collection("accounts")
