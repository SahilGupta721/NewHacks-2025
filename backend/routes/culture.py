from fastapi import APIRouter, HTTPException
from database import db
import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

router = APIRouter()

@router.get("/culture/destinations/{country_id}")
async def get_country_data(country_id: str):
    collection = db["destinations"]
    country_id = country_id.lower()

    # 1. Check MongoDB
    country_data = collection.find_one({"country_id": country_id}, {"_id": 0})
    if country_data:
        return {"success": True, "data": country_data}

    # 2. If not found → generate using Gemini
    try:
        model = genai.GenerativeModel("gemini-1.5-flash")

        prompt = f"""
        Provide a concise and accurate travel and cultural overview for {country_id.upper()} including:
        - 3 top tourist destinations
        - 2 major festivals or traditions
        - 2 famous dishes or beverages
        - Popular crafts, fashion, or souvenirs
        Use a modern, factual tone in under 130 words.
        """

        response = model.generate_content(prompt)
        summary_text = response.text.strip()

        # 3. Store in MongoDB
        new_doc = {
            "country_id": country_id,
            "ai_summary": summary_text
        }
        collection.insert_one(new_doc)

        # 4. Return to frontend
        return {"success": True, "data": new_doc}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gemini generation failed: {str(e)}")
