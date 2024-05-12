from fastapi import FastAPI, UploadFile, File
from deepface import DeepFace

app = FastAPI()

@app.post("/result")
async def predict_image(image: UploadFile = File(...)):
    # 업로드된 파일을 서버에 저장
    with open("uploaded_image.jpg", "wb") as file:
        file.write(await image.read())

    # 저장된 이미지 경로를 사용하여 감정 분석 실행
    objs = DeepFace.analyze(img_path="uploaded_image.jpg", actions=['emotion'])

    # 결과 반환
    return objs
