from enum import Enum
from pydantic import BaseModel
from typing import Optional


class AccountType(str, Enum):
    CHECKING = "Checking"
    SAVINGS = "Savings"


class Account(BaseModel):
    account_id: int
    account_type: AccountType
    balance: float
    customer_id: str

class AccountCreate(BaseModel):
    account_type: AccountType
    balance: float
    customer_id: str


class Account(AccountCreate):
    id: Optional[str] = None
