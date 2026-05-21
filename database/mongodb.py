from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URL = "mongodb://3.91.173.4:27017"

client = AsyncIOMotorClient("mongodb://3.91.173.4:27017")

database = client.bank_db

customer_collection = database.get_collection("customers")
account_collection = database.get_collection("accounts")
