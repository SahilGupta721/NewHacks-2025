# backend/routes/serpapi_proxy.py
from fastapi import APIRouter, Query
import requests
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

SERP_API_KEY = os.getenv("VITE_SERPAPI_KEY")

@router.get("/serpapi")
def get_products(country_code: str = Query(...)):
    try:
        url = "https://serpapi.com/search"
        params = {
            "engine": "google_shopping",
            "q": "local handcrafted products",
            "gl": country_code.lower(),
            "hl": "en",
            "api_key": SERP_API_KEY
        }
        response = requests.get(url, params=params)
        return response.json()
    except Exception as e:
        return {"error": str(e)}
