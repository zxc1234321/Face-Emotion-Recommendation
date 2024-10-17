import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
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
    const url = 'https://api.themoviedb.org/3/discover/movie';
    const params = {
      include_adult: 'false',
      include_video: 'false',
      language: 'en-US',
      page: '1',
      sort_by: 'popularity.desc',
      with_keywords: emotion
    };
    const headers = {
      accept: 'application/json',
      Authorization: `Bearer ${this.apiKey}`
    };

    try {
      const response = await firstValueFrom(
        this.httpService.get(url, { params, headers })
      );
      return response.data;
    } catch (error) {
      this.logger.error('Error fetching TMDB movie recommendations', error.message);
      throw new InternalServerErrorException('Failed to fetch TMDB movie recommendations');
    }
  }

  async getTvRecommendations(emotion: string): Promise<any> {
    const url = 'https://api.themoviedb.org/3/discover/tv';
    const params = {
      include_adult: 'false',
      language: 'en-US',
      page: '1',
      sort_by: 'popularity.desc',
      with_keywords: emotion
    };
    const headers = {
      accept: 'application/json',
      Authorization: `Bearer ${this.apiKey}`
    };

    try {
      const response = await firstValueFrom(
        this.httpService.get(url, { params, headers })
      );
      return response.data;
    } catch (error) {
      this.logger.error('Error fetching TMDB TV recommendations', error.message);
      throw new InternalServerErrorException('Failed to fetch TMDB TV recommendations');
    }
  }
}
