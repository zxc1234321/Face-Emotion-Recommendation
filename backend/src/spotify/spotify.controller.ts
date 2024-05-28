import { Controller, Get, Query } from '@nestjs/common';
import { SpotifyService } from './spotify.service';

@Controller('spotify')
export class SpotifyController {
  constructor(private readonly spotifyService: SpotifyService) {}

  @Get('callback')
  async callback(@Query('code') code: string) {
    const tokenData = await this.spotifyService.getAccessToken(code);
    return tokenData;
  }

  @Get('profile')
  async profile(@Query('accessToken') accessToken: string) {
    const userProfile = await this.spotifyService.getUserProfile(accessToken);
    return userProfile;
  }

  @Get('search-by-emotion')
  async searchByEmotion(
    @Query('emotion') emotion: string,
    @Query('accessToken') accessToken: string,
    @Query('refreshToken') refreshToken: string,
  ) {
    const tracks = await this.spotifyService.searchTracksByEmotion(emotion, accessToken, refreshToken);
    return tracks;
  }
}