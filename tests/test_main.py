from fastapi.testclient import TestClient
from bank_api.main import app

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
