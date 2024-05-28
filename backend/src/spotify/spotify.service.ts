import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SpotifyService {
  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.clientId = this.configService.get<string>('SPOTIFY_CLIENT_ID');
    this.clientSecret = this.configService.get<string>('SPOTIFY_CLIENT_SECRET');
    this.redirectUri = this.configService.get<string>('SPOTIFY_REDIRECT_URI');
  }

  async getAccessToken(code: string): Promise<any> {
    const url = 'https://accounts.spotify.com/api/token';
    const headers = {
      Authorization: 'Basic ' + Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: this.redirectUri,
    }).toString();

    const response = await firstValueFrom(this.httpService.post(url, body, { headers }));
    return response.data;
  }

  async refreshAccessToken(refreshToken: string): Promise<any> {
    const url = 'https://accounts.spotify.com/api/token';
    const headers = {
      Authorization: 'Basic ' + Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const body = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }).toString();

    const response = await firstValueFrom(this.httpService.post(url, body, { headers }));
    return response.data;
  }

  async getUserProfile(accessToken: string): Promise<any> {
    const url = 'https://api.spotify.com/v1/me';
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await firstValueFrom(this.httpService.get(url, { headers }));
    return response.data;
  }

  async searchTracksByEmotion(emotion: string, accessToken: string, refreshToken: string): Promise<any> {
    let url = `https://api.spotify.com/v1/search?q=${emotion}&type=track`;
    let headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    try {
      const response = await firstValueFrom(this.httpService.get(url, { headers }));
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        // Access token expired, refresh it
        const newTokenData = await this.refreshAccessToken(refreshToken);
        accessToken = newTokenData.access_token;

        // Retry the request with the new access token
        headers.Authorization = `Bearer ${accessToken}`;
        const response = await firstValueFrom(this.httpService.get(url, { headers }));
        return response.data;
      } else {
        throw error;
      }
    }
  }
}