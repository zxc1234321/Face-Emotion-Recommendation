import axios from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WebcamService {
  constructor() {}

  // 이미지를 FastAPI로 보냄
  async analyzeImage(image: Buffer): Promise<any> {
    try {
      // Buffer를 Blob으로 변환
      const blob = new Blob([image], { type: 'image/jpeg' });

      const formData = new FormData();
      formData.append('image', blob, 'image.jpg');

      const response = await axios.post('http://localhost:3000/result', formData);

      return response.data.emotion;
    } catch (error) {
      throw error;
    }
  }
}
