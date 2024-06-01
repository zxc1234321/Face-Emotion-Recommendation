import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class BooksService {
  private readonly logger = new Logger(BooksService.name);
  private readonly emotionKeywordMap: { [key: string]: string } = {
    happy: 'happiness',
    sad: 'sadness',
    angry: 'anger',
    surprised: 'surprise',
    scared: 'fear',
    disgusted: 'disgust',
    neutral: 'neutral',
    fear: 'fear',
    excited: 'excited',
    calm: 'calm',
    nostalgic: 'nostalgic',
    // 추가적인 감정과 키워드 매핑
  };

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getRecommendations(emotion: string): Promise<any> {
    const keyword = this.emotionKeywordMap[emotion.toLowerCase()] || emotion;
    const apiKey = this.configService.get<string>('BOOKS_API_KEY');
    const url = 'https://www.googleapis.com/books/v1/volumes';
    const params = {
      q: keyword,
      key: apiKey,
    };
    const headers = {
      Referer: 'http://localhost:3000', // 적절한 Referer 헤더 추가
    };

    try {
      console.log('Google Books API Key:', apiKey); // 디버깅 로그 추가
      const response = await firstValueFrom(
        this.httpService.get(url, { params, headers }),
      );
      console.log('Google Books API Response:', response.data); // 디버깅 로그 추가
      return response.data.items;
    } catch (error) {
      this.logger.error(
        'Error fetching Google Books recommendations',
        error.response ? error.response.data : error.message,
      );
      throw new InternalServerErrorException(
        'Failed to fetch Google Books recommendations',
      );
    }
  }
}
