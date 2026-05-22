from pydantic import BaseModel, Field
from typing import List
from models.account import Account


class Customer(BaseModel):
    customer_id: str | int
    name: str
    accounts: List[Account] = Field(default_factory=list)


class CustomerCreate(BaseModel):
    name: str
    accounts: List[Account] = Field(default_factory=list)
