import { Controller, Post, Body } from '@nestjs/common';
import { WebcamService } from './webcam.service';

@Controller('webcam')
export class WebcamController {
  constructor(private readonly webcamService: WebcamService) {}

  @Post('analyze')
  async analyze(@Body() body: { imagePath: string, accessToken: string, refreshToken: string }) {
    const { imagePath, accessToken, refreshToken } = body;
    const tracks = await this.webcamService.analyzeAndSearchTracks(imagePath, accessToken, refreshToken);
    return tracks;
  }
}