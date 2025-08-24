
import os
os.environ["API_KEY"] = "devkey"
os.environ["DATABASE_URL"] = "sqlite:///./test.db"

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)
headers = {"x-api-key": "devkey"}

def test_health():
    r = client.get("/health")
    assert r.status_code == 200
    assert r.json()["status"] == "ok"

def test_crud_and_stats():
    payload = {
        "company": "Barclays",
        "role": "Graduate SWE",
        "location": "London",
        "status": "applied",
        "source": "careers",
        "notes": "submitted"
    }
    # create
    r = client.post("/applications", json=payload, headers=headers)
    assert r.status_code == 201
    app_id = r.json()["id"]

    # list
    r = client.get("/applications", headers=headers)
    assert r.status_code == 200
    data = r.json()
    assert any(x["id"] == app_id for x in data)

    # update
    r = client.put(f"/applications/{app_id}", json={"status": "interview"}, headers=headers)
    assert r.status_code == 200
    assert r.json()["status"] == "interview"

    # stats
    r = client.get("/stats/summary", headers=headers)
    assert r.status_code == 200
    assert "total" in r.json()

    # delete
    r = client.delete(f"/applications/{app_id}", headers=headers)
    assert r.status_code == 204
