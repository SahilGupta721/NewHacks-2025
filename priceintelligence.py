@app.get("/price-intelligence/{product_id}")
def price_intelligence(product_id: str):
    # Fetch all prices for the product
    price_docs = list(prices_col.find({"product_id": product_id}))
    if not price_docs:
        return {"error": "No price data available"}

    prices = [p['price'] for p in price_docs]
    median_price = sorted(prices)[len(prices)//2]
    current_price = prices[0]  # example vendor

    # Overpriced check
    threshold = 0.2
    status = "Overpriced" if current_price > median_price * (1 + threshold) else "Fair"

    # Alternatives
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
