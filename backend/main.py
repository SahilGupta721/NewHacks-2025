from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import culture  # Add other routes here if needed (e.g. products, prices, etc.)

app = FastAPI(title="Sophotravel API")

# ✅ Allow requests from your React frontend (localhost:5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Your frontend dev URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Include your routers
app.include_router(culture.router, prefix="/api")

# ✅ Default root route
@app.get("/")
def home():
    return {"message": "Welcome to Sophotravel API with Gemini"}

# ✅ Run with reload enabled for development
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
