from pydantic import BaseModel
from typing import List
from models.account import Account


class Customer(BaseModel):
    customer_id: str | int
    name: str
    accounts: List[Account] = []


class CustomerCreate(BaseModel):
    name: str
    accounts: List[Account] = []
