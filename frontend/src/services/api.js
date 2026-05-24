import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
});

// Customers
export const getCustomers = () => api.get("/customers");
export const getCustomer = (id) => api.get(`/customers/${id}`);
export const createCustomer = (data) => api.post("/customers", data);
export const deleteCustomer = (id) => api.delete(`/customers/${id}`);

// Accounts
export const getAccounts = () => api.get("/accounts");
export const getAccountsByCustomer = (customerId) =>
  api.get(`/accounts/customer/${customerId}`);
export const getPremiumAccounts = () => api.get("/accounts/premium");
export const getLowBalanceAccounts = () => api.get("/accounts/lowbalance");
export const createAccount = (data) => api.post("/accounts", data);
export const deleteAccount = (id) => api.delete(`/accounts/${id}`);
