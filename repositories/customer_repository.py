from database.mongodb import customer_collection, account_collection
from models.customer import CustomerCreate
from bson import ObjectId


class CustomerRepository:

    @staticmethod
    async def get_all_customers():

        customers = []

        async for customer in customer_collection.find():
            async for account in account_collection.find():
                if account["customer_id"] == str(customer["_id"]):
                    account["_id"] = str(account["_id"])
                    del account["customer_id"]
                    account["account_id"] = account["_id"]
                    del account["_id"]
                    customer["accounts"].append(account)
            customer["_id"] = str(customer["_id"])
            customer["customer_id"] = customer["_id"]
            del customer["_id"]
            customers.append(customer)

        return customers

    @staticmethod
    async def get_customer_by_id(customer_id: str | int):

        customer = await customer_collection.find_one({"_id": ObjectId(customer_id)})
        customer["_id"] = str(customer["_id"])
        customer["customer_id"] = customer["_id"]
        del customer["_id"]

        async for account in account_collection.find():
            if account["customer_id"] == customer_id:
                account["_id"] = str(account["_id"])
                del account["customer_id"]
                account["account_id"] = account["_id"]
                del account["_id"]
                customer["accounts"].append(account)

        return customer

    @staticmethod
    async def create_customer(customer_data: CustomerCreate):

        customer_dict = customer_data.model_dump()

        result = await customer_collection.insert_one(customer_dict)

        customer_dict["_id"] = str(result.inserted_id)

        return customer_dict

    @staticmethod
    async def delete_customer(customer_id: str):

        customer = await customer_collection.find_one(
            {"_id": ObjectId(customer_id)}
        )

        if not customer:
            return None

        # cascade delete accounts
        await account_collection.delete_many(
            {"customer_id": customer_id}
        )

        await customer_collection.delete_one(
            {"_id": ObjectId(customer_id)}
        )

        customer["id"] = str(customer["_id"])
        del customer
        return "Customer deleted"
