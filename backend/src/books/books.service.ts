import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BooksService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getRecommendations(emotion: string): Promise<any> {
    try {
      const apiKey = this.configService.get<string>('BOOKS_API_KEY');
      console.log('Google Books API Key:', apiKey); // 디버깅 로그 추가
      const response = await this.httpService
        .get('https://www.googleapis.com/books/v1/volumes', {
          params: {
            q: emotion,
            key: apiKey,
          },
          headers: {
            Referer: 'http://localhost:3000', // 적절한 Referer 헤더 추가
          },
        })
        .toPromise();
      console.log('Google Books API Response:', response.data); // 디버깅 로그 추가
      return response.data.items;
    } catch (error) {
      console.error(
        'Error fetching Google Books recommendations:',
        error.response ? error.response.data : error.message,
      );
      throw new Error('Failed to fetch Google Books recommendations');
    }
  }
}
