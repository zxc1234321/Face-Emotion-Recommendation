from deepface import DeepFace
import sys
import json

def analyze_image(image_path):
    objs = DeepFace.analyze(img_path=image_path, actions=['emotion'], enforce_detection=False)
    return objs

if __name__ == "__main__":
    image_path = sys.argv[1]
    try:
        result = analyze_image(image_path)
        print(json.dumps(result))  # JSON 형식으로 결과 출력
    except Exception as e:
        print(json.dumps({"error": str(e)}))  # 오류 발생 시 JSON 형식으로 출력
