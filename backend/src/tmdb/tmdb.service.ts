import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class TmdbService {
  constructor(private configService: ConfigService) {}

  async getMovieRecommendations(emotion: string): Promise<any> {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
        params: {
          api_key: this.configService.get('TMDB_API_KEY'),
          query: emotion,
        },
      });
      console.log('TMDB Movie API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching TMDB movie recommendations:', error.response ? error.response.data : error.message);
      throw error;
    }
  }

  async getTvRecommendations(emotion: string): Promise<any> {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/discover/tv', {
        params: {
          api_key: this.configService.get('TMDB_API_KEY'),
          query: emotion,
        },
      });
      console.log('TMDB TV API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching TMDB TV recommendations:', error.response ? error.response.data : error.message);
      throw error;
    }
  }
}
