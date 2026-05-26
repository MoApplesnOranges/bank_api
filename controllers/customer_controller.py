from fastapi import APIRouter, HTTPException
from services.customer_service import CustomerService
from models.customer import CustomerCreate, Customer

router = APIRouter()


@router.get("/customers")
async def get_all_customers():
    return await CustomerService.get_all_customers()


@router.get("/customers/{customer_id}")
async def get_customer_by_id(customer_id: int | str):
    customer = await CustomerService.get_customer_by_id(customer_id)
    return customer


@router.post("/customers")
async def create_customer(customer_data: CustomerCreate):
    return await CustomerService.create_customer(customer_data)

@router.put("/customers/{customer_id}")
async def update_customer(customer_data: Customer):
    return await CustomerService.update_customer(customer_data)

@router.delete("/customers/{customer_id}")
async def delete_customer(customer_id: int | str):
    await CustomerService.delete_customer(customer_id)
    return {"message": f"Customer with ID {customer_id} deleted (functionality not implemented)."}
