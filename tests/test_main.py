from fastapi.testclient import TestClient
from ../main.py import app

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
