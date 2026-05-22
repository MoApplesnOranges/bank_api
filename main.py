import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from controllers.customer_controller import router as customer_router
from controllers.account_controller import router as account_router

load_dotenv()

app = FastAPI(title="Bank API", version="1.0.0")

# CORS — allow GitHub Pages frontend and local dev
ALLOWED_ORIGINS = [
    "https://MoApplesnOranges.github.io",   # GitHub Pages
    "http://localhost:5173",                  # Vite dev server
    "http://localhost:3000",                  # Docker frontend
]

# Allow any additional origin set via env (e.g. a custom domain)
extra_origin = os.getenv("CORS_ORIGIN")
if extra_origin:
    ALLOWED_ORIGINS.append(extra_origin)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(customer_router)
app.include_router(account_router)


@app.get("/")
def home():
    return {"message": "Bank API Running"}
