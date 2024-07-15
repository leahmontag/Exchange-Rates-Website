from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from routes import router as currency_router


app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins = ["*"],
  allow_methods = ["*"],
  allow_headers = ["*"]
)


@app.get("/")
async def root():
    return {"message": "Welcome to The Server Side"}    


    
app.include_router(currency_router)

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8080)    