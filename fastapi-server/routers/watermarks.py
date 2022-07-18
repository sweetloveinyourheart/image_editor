from fastapi import APIRouter
from pydantic import BaseModel
from controllers import watermarks

router = APIRouter()

class AddWatermark(BaseModel):
    image: str
    watermark: str

@router.post('/watermark/add')
def add_watermark(data: AddWatermark):
    return watermarks.add_watermark(data.image, data.watermark)