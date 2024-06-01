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

  private emotionKeywordMap: { [key: string]: string } = {
    happy: '35', // Comedy
    sad: '18', // Drama
    angry: '28', // Action
    surprised: '12', // Adventure
    scared: '27', // Horror
    disgusted: '80', // Crime
    neutral: '99', // Documentary
    fear: '27', // Horror (Fear and Scared can map to the same genre)
    excited: '28', // Action (Assuming excitement is related to action-packed movies)
    calm: '10749', // Romance (Assuming calm can relate to romantic movies)
    nostalgic: '10751', // Family (Assuming nostalgic feelings can relate to family movies)
    // 추가적인 감정과 키워드 매핑
  };

  async getMovieRecommendations(emotion: string): Promise<any> {
    const keyword = this.emotionKeywordMap[emotion.toLowerCase()] || emotion;
    const url = 'https://api.themoviedb.org/3/discover/movie';
    const params = {
      include_adult: 'false',
      include_video: 'false',
      language: 'en-US',
      page: '1',
      sort_by: 'popularity.desc',
      with_genres: keyword,
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
      this.logger.error(
        'Error fetching TMDB movie recommendations',
        error.message,
      );
      throw new InternalServerErrorException(
        'Failed to fetch TMDB movie recommendations',
      );
    }
  }

  async getTvRecommendations(emotion: string): Promise<any> {
    const keyword = this.emotionKeywordMap[emotion.toLowerCase()] || emotion;
    const url = 'https://api.themoviedb.org/3/discover/tv';
    const params = {
      include_adult: 'false',
      language: 'en-US',
      page: '1',
      sort_by: 'popularity.desc',
      with_genres: keyword,
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
      this.logger.error(
        'Error fetching TMDB TV recommendations',
        error.message,
      );
      throw new InternalServerErrorException(
        'Failed to fetch TMDB TV recommendations',
      );
    }
  }
}
