# models/product.py
from pydantic import BaseModel
from typing import Optional, Dict

class Product(BaseModel):
    id: str
    name: str
    category: str
    description: str
    artisan_id: str
    image_url: Optional[str] = None
    authenticity_id: str
    auth_verified: bool
    auth_method: Optional[str] = "manual verification"
