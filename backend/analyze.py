import sys
import json
import requests

def analyze_image(image_path):
    objs = DeepFace.analyze(img_path=image_path, actions=['emotion'], enforce_detection=False)
    emotion = objs[0]['dominant_emotion']
    return {'emotion': emotion}

if __name__ == "__main__":
    image_path = sys.argv[1]
    try:
        result = analyze_image(image_path)
        emotion = result['emotion']

        # TMDB API를 통해 검색 요청을 보냅니다.
        response = requests.get(
            'http://localhost:3000/tmdb/movie/search-by-emotion',
            'http://localhost:3000/tmdb/drama/search-by-emotion',
            'http://localhost:3000/spotify/search-by-emotion',

            params={'emotion': emotion}
        )
        tmdb_result = response.json()
        print(json.dumps(tmdb_result))  # JSON 형식으로 결과 출력
    except Exception as e:
        print(json.dumps({"error": str(e)}))  # 오류 발생 시 JSON 형식으로 출력