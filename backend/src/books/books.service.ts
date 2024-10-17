import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class BooksService {
  private readonly logger = new Logger(BooksService.name);

  constructor(private readonly httpService: HttpService) {}

  async getRecommendations(emotion: string): Promise<any> {
    const url = 'https://api.example.com/books/recommendations';
    try {
      const response = await firstValueFrom(
        this.httpService.get(url, {
          params: { emotion },
        }),
      );
      return response.data;
    } catch (error) {
      this.logger.error('Error fetching book recommendations', error.message);
      throw new InternalServerErrorException('Failed to fetch book recommendations');
    }
  }
}
