from repositories.customer_repository import CustomerRepository


class CustomerService:

    async def get_all_customers():
        return await CustomerRepository.get_all_customers()

    async def get_customer_by_id(customer_id: int | str):
        return await CustomerRepository.get_customer_by_id(customer_id)

    async def create_customer(customer_data):
        return await CustomerRepository.create_customer(customer_data)

    async def delete_customer(customer_id: int):
        return await CustomerRepository.delete_customer(customer_id)
