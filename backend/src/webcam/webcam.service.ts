import axios from 'axios';
import { Injectable } from '@nestjs/common';
import * as FormData from 'form-data';

@Injectable()
export class WebcamService {
  constructor() {}

  // 이미지를 FastAPI로 보냄
  async analyzeImage(image: Buffer): Promise<any> {
    try {
      const formData = new FormData();
      formData.append('image', image, {
        filename: 'image.jpg',
        contentType: 'image/jpeg',
      });

      const response = await axios.post(
        'http://localhost:8000/analyze',
        formData,
        {
          headers: formData.getHeaders(),
        },
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
