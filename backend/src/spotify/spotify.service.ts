import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class SpotifyService {
  private readonly logger = new Logger(SpotifyService.name);
  private accessToken: string;

  constructor(private readonly httpService: HttpService) {}

  private async fetchAccessToken(): Promise<void> {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const headers = {
      'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    const data = new URLSearchParams({ grant_type: 'client_credentials' });

    try {
      const response = await firstValueFrom(
        this.httpService.post(tokenUrl, data.toString(), { headers })
      );
      this.accessToken = response.data.access_token;
      console.log('Access Token:', this.accessToken);
    } catch (error) {
      this.logger.error('Error fetching Spotify access token', error.message);
      throw new InternalServerErrorException('Failed to fetch Spotify access token');
    }
  }

  async getRecommendations(emotion: string): Promise<any> {
    if (!this.accessToken) {
      await this.fetchAccessToken();
    }

    const url = 'https://api.spotify.com/v1/recommendations';
    try {
      const response = await firstValueFrom(
        this.httpService.get(url, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
          params: {
            seed_genres: emotion,
          },
        }),
      );
      return response.data;
    } catch (error) {
      this.logger.error('Error fetching Spotify recommendations', error.message);
      throw new InternalServerErrorException('Failed to fetch Spotify recommendations');
    }
  }
}
