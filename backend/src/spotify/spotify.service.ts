import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class SpotifyService {
  private accessToken: string;

  constructor(private readonly httpService: HttpService) {}

  private async fetchAccessToken(): Promise<void> {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const headers = {
      Authorization:
        'Basic ' +
        Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const data = new URLSearchParams({ grant_type: 'client_credentials' });

    try {
      const response = await firstValueFrom(
        this.httpService.post(tokenUrl, data.toString(), { headers }),
      );
      this.accessToken = response.data.access_token;
      console.log('Access Token:', this.accessToken);
    } catch (error) {
      console.error(
        'Error fetching Spotify access token:',
        error.response ? error.response.data : error.message,
      );
      throw new Error('Failed to fetch Spotify access token');
    }
  }

  async getRecommendations(emotion: string): Promise<any> {
    if (!this.accessToken) {
      await this.fetchAccessToken();
    }

    const url = 'https://api.spotify.com/v1/recommendations';
    const seed_genres = this.mapEmotionToGenre(emotion); // 감정을 장르로 매핑하는 함수 호출
    try {
      const response = await firstValueFrom(
        this.httpService.get(url, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
          params: {
            seed_genres: seed_genres.join(','), // 콤마로 구분된 문자열로 변환
            limit: 10, // 추천받을 곡 수 제한
          },
        }),
      );
      return response.data;
    } catch (error) {
      console.error(
        'Error fetching Spotify recommendations',
        error.response ? error.response.data : error.message,
      );
      throw new Error('Failed to fetch Spotify recommendations');
    }
  }

  private mapEmotionToGenre(emotion: string): string[] {
    const genreMap = {
      happy: ['pop', 'dance', 'happy'],
      sad: ['acoustic', 'blues', 'sad'],
      angry: ['metal', 'rock', 'angry'],
      neutral: ['chill', 'indie', 'ambient'],
      fear: ['soundtrack', 'classical', 'fear'],
    };
    return genreMap[emotion] || ['pop'];
  }
}
