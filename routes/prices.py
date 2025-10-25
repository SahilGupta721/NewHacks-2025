# routes/prices.py
from fastapi import APIRouter
from database import prices_col, shops_col

router = APIRouter()

@router.get("/price-intelligence/{product_id}")
def price_intelligence(product_id: str):
    price_docs = list(prices_col.find({"product_id": product_id}))
    if not price_docs:
        return {"error": "No price data available"}

    prices = [p['price'] for p in price_docs]
    median_price = sorted(prices)[len(prices)//2]
    current_price = prices[0]  # Assume first vendor for simplicity

    # Check if overpriced (20% threshold)
    threshold = 0.2
    status = "Overpriced" if current_price > median_price * (1 + threshold) else "Fair"

    # Find cheaper alternatives
    alternatives = []
    for p in price_docs:
        if p['price'] < current_price:
            shop = shops_col.find_one({"_id": p['shop_id']})
            alternatives.append({
                "name": shop['name'],
                "price": p['price'],
                "location": shop['location']
            })

    return {
        "product_id": product_id,
        "current_price": current_price,
        "median_price": median_price,
        "status": status,
        "alternatives": alternatives
    }

# routes/prices.py
from fastapi import APIRouter
from utils.price_utils import get_price_intelligence

router = APIRouter()

@router.get("/price-intelligence/{product_id}")
def price_intelligence(product_id: str):
    return get_price_intelligence(product_id)

# routes/prices.py
from fastapi import APIRouter
from utils.price_utils import get_price_intelligence
from utils.bargain_bot import generate_bargaining_tips

router = APIRouter()

@router.get("/price-intelligence/{product_id}")
def price_intelligence(product_id: str):
    data = get_price_intelligence(product_id)

    # If error (no prices), return immediately
    if "error" in data:
        return data

    # Generate bargaining tips using AI logic
    product_name = data.get("product_id")
    current_price = data.get("current_price")
    median_price = data.get("median_price")
    data["bargaining_tips"] = generate_bargaining_tips(product_name, current_price, median_price)

    return data
