import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { WebcamService } from './webcam.service';
import { FileInterceptor } from "@nestjs/platform-express";
import * as fs from "node:fs";

@Controller('webcam')
export class WebcamController {
  webcamService: WebcamService;

  constructor(webcamService: WebcamService) {
    this.webcamService = webcamService;
  }
  @Post('/result')
  @UseInterceptors(FileInterceptor('image'))
  async analyzeImage(@UploadedFile() image: Express.Multer.File): Promise<any> {
    const result = await this.webcamService.analyzeImage(image.buffer);

    const emotionResult = result['emotion'];
    return emotionResult;
  }
}
