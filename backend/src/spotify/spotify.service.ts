// spotify.service.ts
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

  async getUserProfile(accessToken: string): Promise<any> {
    const url = 'https://api.spotify.com/v1/me';
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await firstValueFrom(this.httpService.get(url, { headers }));
    return response.data;
  }

  async searchTracksByEmotion(emotion: string, accessToken: string): Promise<any> {
    const url = `https://api.spotify.com/v1/search?q=${emotion}&type=track`;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await firstValueFrom(this.httpService.get(url, { headers }));
    return response.data;
  }
}