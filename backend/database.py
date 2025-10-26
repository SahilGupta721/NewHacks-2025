
# database.py
from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load .env variables
load_dotenv()

# Get Mongo URI from environment
MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    raise ValueError("MONGO_URI is not set in .env file")

# Connect to MongoDB
client = MongoClient(MONGO_URI)
db = client["sophotravel"]

# Collections
products_col = db["products"]
shops_col = db["shops"]
prices_col = db["prices"]
artisans_col = db["artisans"]


