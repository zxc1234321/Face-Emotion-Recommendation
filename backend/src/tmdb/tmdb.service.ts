import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class TmdbService {
  private readonly logger = new Logger(TmdbService.name);
  private readonly apiKey = process.env.TMDB_API_KEY;

  constructor(private readonly httpService: HttpService) {}

  async getMovieRecommendations(emotion: string): Promise<any> {
    const url = 'https://api.themoviedb.org/3/search/movie';
    const params = {
      query: emotion,
      include_adult: 'false',
      language: 'en-US',
      page: '1',
    };
    const headers = {
      accept: 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.get(url, { params, headers }),
      );
      return response.data;
    } catch (error) {
      this.logger.error('Error searching movies by emotion', error.message);
      throw new InternalServerErrorException(
        'Failed to search movies by emotion',
      );
    }
  }

  async getTvRecommendations(emotion: string): Promise<any> {
    const url = 'https://api.themoviedb.org/3/search/tv';
    const params = {
      query: emotion,
      include_adult: 'false',
      language: 'en-US',
      page: '1',
    };
    const headers = {
      accept: 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.get(url, { params, headers }),
      );
      return response.data;
    } catch (error) {
      this.logger.error('Error searching TV shows by emotion', error.message);
      throw new InternalServerErrorException(
        'Failed to search TV shows by emotion',
      );
    }
  }
}
