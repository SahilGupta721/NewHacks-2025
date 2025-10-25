from fastapi import FastAPI
from routes import products, verification, prices, shops

app = FastAPI(title="Sophotravel API")

# Include all routers

app.include_router(products.router, prefix="/api")
app.include_router(verification.router, prefix="/api")
app.include_router(prices.router, prefix="/api")
app.include_router(shops.router, prefix="/api")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
