import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { WebcamService } from './webcam.service';

@Controller('webcam')
export class WebcamController {
  constructor(private readonly webcamService: WebcamService) {}

  @Post('result')
  @UseInterceptors(FileInterceptor('image'))
  async analyzeImage(@UploadedFile() image: Express.Multer.File): Promise<any> {
    const result = await this.webcamService.analyzeImage(image.buffer);
    return result;
  }
}
