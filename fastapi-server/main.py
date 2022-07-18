from fastapi import FastAPI
from routers import watermarks

app = FastAPI()

app.include_router(watermarks.router)