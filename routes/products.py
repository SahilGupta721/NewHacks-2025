# routes/products.py
from fastapi import APIRouter
from database import products_col

router = APIRouter()

@router.get("/products")
def get_all_products():
    products = list(products_col.find({}, {"_id": 0}))  # Exclude internal Mongo _id
    return {"products": products}

@router.get("/products/{product_id}")
def get_product(product_id: str):
    product = products_col.find_one({"_id": product_id}, {"_id": 0})
    if not product:
        return {"error": "Product not found"}
    return product
