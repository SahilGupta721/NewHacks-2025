# routes/verification.py
from fastapi import APIRouter
from database import products_col

router = APIRouter()

@router.get("/verify/{auth_id}")
def verify_product(auth_id: str):
    product = products_col.find_one({"authenticity_id": auth_id})
    if not product:
        return {"status": "failed", "message": "Product not found or invalid authenticity code."}

    if product.get("auth_verified"):
        return {
            "status": "success",
            "product_name": product["name"],
            "artisan_id": product["artisan_id"],
            "auth_method": product.get("auth_method", "manual verification")
        }
    else:
        return {"status": "failed", "message": "Product authenticity could not be verified."}
