from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URL = "mongodb://localhost:27017"

client = AsyncIOMotorClient(MONGO_URL)

database = client.bank_db

customer_collection = database.get_collection("customers")
account_collection = database.get_collection("accounts")
