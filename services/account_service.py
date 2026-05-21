from repositories.account_repository import AccountRepository
from models.account import AccountCreate


class AccountService:

    async def get_all_accounts():
        return await AccountRepository.get_all_accounts()

    async def create_account(account_data: AccountCreate):
        return await AccountRepository.create_account(account_data)

    async def get_accounts_by_customer_id(customer_id: str):
        return await AccountRepository.get_accounts_by_customer_id(customer_id)

    async def get_premium_accounts():
        return await AccountRepository.get_premium_accounts()

    async def get_low_balance_accounts():
        return await AccountRepository.get_low_balance_accounts()

    async def delete_account(account_id: str):
        return await AccountRepository.delete_account(account_id)
