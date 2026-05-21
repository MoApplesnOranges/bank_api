from fastapi import APIRouter
from services.account_service import AccountService
from models.account import AccountCreate

router = APIRouter()


@router.get("/accounts")
async def get_all_accounts():
    return await AccountService.get_all_accounts()


@router.get("/accounts/customer/{customer_id}")
async def get_accounts_by_customer_id(customer_id: str):
    return await AccountService.get_accounts_by_customer_id(customer_id)


@router.get("/accounts/premium")
async def get_premium_accounts():
    return await AccountService.get_premium_accounts()


@router.get("/accounts/lowbalance")
async def get_low_balance_accounts():
    return await AccountService.get_low_balance_accounts()


@router.post("/accounts")
async def create_account(account_data: AccountCreate):
    return await AccountService.create_account(account_data)


@router.delete("/accounts/{account_id}")
async def delete_account(account_id: str):
    return await AccountService.delete_account(account_id)
