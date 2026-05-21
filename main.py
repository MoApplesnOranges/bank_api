from fastapi import FastAPI
# from pymongo import MongoClient

from controllers.customer_controller import router as customer_router
from controllers.account_controller import router as account_router
# from database.mongodb import account_collection

app = FastAPI()

app.include_router(customer_router)
app.include_router(account_router)


@app.get("/")
def home():
    return {"message": "Bank API Running"}


# async def apply_interest():
#     while True:
#         await asyncio.sleep(3600)  # Apply interest every hour
#         for account in account_collection:
#             account.balance *= 1.01

# @app.on_event("startup")
# async def startup_event():
#     asyncio.create_task(apply_interest())
