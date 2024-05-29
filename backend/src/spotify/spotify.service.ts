import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class SpotifyService {
  private accessToken: string;

  constructor(private configService: ConfigService) {
    this.getAccessToken();
  }

  async getAccessToken() {
    try {
      const response = await axios.post('https://accounts.spotify.com/api/token', null, {
        params: {
          grant_type: 'client_credentials',
        },
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${this.configService.get('SPOTIFY_CLIENT_ID')}:${this.configService.get('SPOTIFY_CLIENT_SECRET')}`,
          ).toString('base64')}`,
        },
      });
      this.accessToken = response.data.access_token;
      console.log('Spotify Access Token:', this.accessToken);
    } catch (error) {
      console.error('Error fetching Spotify access token:', error);
      throw error;
    }
  }

  async getRecommendations(emotion: string): Promise<any> {
    try {
      const response = await axios.get('https://api.spotify.com/v1/recommendations', {
        params: {
          seed_genres: emotion,
        },
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });
      console.log('Spotify API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching Spotify recommendations:', error.response ? error.response.data : error.message);
      throw error;
    }
  }
}
