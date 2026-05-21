from database.mongodb import account_collection
from models.account import AccountCreate
from bson import ObjectId


class AccountRepository:

    async def get_all_accounts():
        accounts = []
        async for account in account_collection.find():
            account["account_id"] = str(account["_id"])
            del account["_id"]
            accounts.append(account)
        return accounts

    async def get_accounts_by_customer_id(customer_id: str):
        accounts = []
        async for account in account_collection.find(
            {"customer_id": customer_id}
        ):
            account["id"] = str(account["_id"])
            del account["_id"]
            accounts.append(account)
        return accounts

    async def get_premium_accounts():
        accounts = []
        async for account in account_collection.find({"balance": {"$gte": 10000}}):
            account["id"] = str(account["_id"])
            del account["_id"]
            accounts.append(account)
        return accounts

    async def get_low_balance_accounts():
        accounts = []
        async for account in account_collection.find({"balance": {"$lt": 1000}}):
            account["id"] = str(account["_id"])
            del account["_id"]
            accounts.append(account)
        return accounts

    async def create_account(account_data: AccountCreate):
        account_dict = account_data.model_dump()
        result = await account_collection.insert_one(account_dict)
        account_dict["_id"] = str(result.inserted_id)
        account_dict["account_id"] = account_dict["_id"]
        del account_dict["_id"]
        return account_dict

    async def delete_account(account_id: str):
        account = await account_collection.find_one({"_id": ObjectId(account_id)})
        if not account:
            return None
        await account_collection.delete_one({"_id": ObjectId(account_id)})
        account["id"] = str(account["_id"])
        del account["_id"]
        return "Account deleted"
