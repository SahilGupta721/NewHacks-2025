from pymongo import MongoClient

client = MongoClient("mongodb+srv://<username>:<password>@cluster0.mongodb.net/")
db = client["culturacart"]

# Products
db.products.insert_many([
    {"_id": "product_001", "name": "Kimono", "category": "fashion", "description": "Authentic Kimono from Kyoto", "artisan_id": "artisan_001", "image_url": "link"},
    {"_id": "product_002", "name": "Wooden Carving", "category": "souvenir", "description": "Handmade wood", "artisan_id": "artisan_002", "image_url": "link"}
])

# Shops
db.shops.insert_many([
    {"_id": "shop_001", "name": "Local Artisan Shop A", "location": {"lat": 43.65, "lng": -79.34}, "verified": True},
    {"_id": "shop_002", "name": "Craft Market B", "location": {"lat": 43.66, "lng": -79.35}, "verified": True}
])

# Prices
db.prices.insert_many([
    {"product_id": "product_001", "shop_id": "shop_001", "price": 120, "currency": "CAD", "timestamp": "2025-10-25T12:00:00Z", "source": "vendor"},
    {"product_id": "product_001", "shop_id": "shop_002", "price": 110, "currency": "CAD", "timestamp": "2025-10-25T12:10:00Z", "source": "vendor"}
])
