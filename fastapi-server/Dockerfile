FROM python:3.10

WORKDIR /fastapi

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY . .

# install the cv2 dependencies
RUN apt-get update

RUN apt-get install ffmpeg libsm6 libxext6  -y

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]