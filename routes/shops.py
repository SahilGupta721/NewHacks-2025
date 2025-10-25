# # routes/shops.py
# from fastapi import APIRouter
# from database import shops_col
#
# router = APIRouter()
#
# # -----------------------------
# # Get all shops
# # -----------------------------
# @router.get("/shops")
# def get_all_shops():
#     shops = list(shops_col.find({}, {"_id": 0}))  # Exclude internal Mongo _id
#     return {"shops": shops}
#
# # -----------------------------
# # Get shop by ID
# # -----------------------------
# @router.get("/shops/{shop_id}")
# def get_shop(shop_id: str):
#     shop = shops_col.find_one({"_id": shop_id}, {"_id": 0})
#     if not shop:
#         return {"error": "Shop not found"}
#     return shop
