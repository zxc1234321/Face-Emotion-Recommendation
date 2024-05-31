import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'; // 경로 수정
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TmdbService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getMovieRecommendations(emotion: string): Promise<any> {
    const apiKey = this.configService.get<string>('TMDB_API_KEY');
    const response = await this.httpService
      .get('https://api.themoviedb.org/3/discover/movie', {
        params: {
          api_key: apiKey,
          with_genres: emotion,
        },
      })
      .toPromise();
    return response.data;
  }

  async getTvRecommendations(emotion: string): Promise<any> {
    const apiKey = this.configService.get<string>('TMDB_API_KEY');
    const response = await this.httpService
      .get('https://api.themoviedb.org/3/discover/tv', {
        params: {
          api_key: apiKey,
          with_genres: emotion,
        },
      })
      .toPromise();
    return response.data;
  }
}
