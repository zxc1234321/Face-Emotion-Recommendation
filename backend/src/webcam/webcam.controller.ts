import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { WebcamService } from './webcam.service';

@Controller('webcam')
export class WebcamController {
  constructor(private readonly webcamService: WebcamService) {}

  @Post('analyze')
  @UseInterceptors(FileInterceptor('image'))
  async analyzeImage(@UploadedFile() image: Express.Multer.File): Promise<any> {
    return this.webcamService.analyzeImage(image);
  }
}
