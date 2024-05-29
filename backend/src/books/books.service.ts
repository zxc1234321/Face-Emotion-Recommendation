import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class BooksService {
  constructor(private configService: ConfigService) {}

  async getRecommendations(emotion: string): Promise<any> {
    try {
      const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
        params: {
          q: emotion,
          key: this.configService.get('GOOGLE_BOOKS_API_KEY'),
        },
      });
      console.log('Google Books API Response:', response.data);
      return response.data.items;
    } catch (error) {
      console.error('Error fetching Google Books recommendations:', error.response ? error.response.data : error.message);
      throw error;
    }
  }
}
