import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { EmotionService } from '../emotion/emotion.service';
import { SpotifyService } from '../spotify/spotify.service';
import { TmdbService } from '../tmdb/tmdb.service';
import { BooksService } from '../books/books.service';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';

@Controller('webcam')
export class WebcamController {
  constructor(
    private readonly emotionService: EmotionService,
    private readonly spotifyService: SpotifyService,
    private readonly tmdbService: TmdbService,
    private readonly booksService: BooksService,
  ) {}

  @Post('analyze')
  @UseInterceptors(FileInterceptor('image', { dest: './uploads' }))
  async analyze(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const imagePath = path.join(
        __dirname,
        '..',
        '..',
        'uploads',
        file.filename,
      );
      console.log('Uploaded file path:', imagePath);

      const result = await this.emotionService.analyzeEmotion(imagePath);
      console.log('Emotion analysis result:', result);

      if (!result || !result[0] || !result[0].dominant_emotion) {
        throw new Error('Failed to detect dominant emotion');
      }

      const emotion = result[0].dominant_emotion;
      const musicRecommendations = await this.spotifyService.getRecommendations(
        emotion,
      );
      const bookRecommendations = await this.booksService.getRecommendations(
        emotion,
      );

      res.json({
        emotion,
        music: musicRecommendations,
        books: bookRecommendations,
      });

      // 이미지 파일 삭제
      fs.unlinkSync(imagePath);
    } catch (error) {
      console.error(
        'Error analyzing emotion and fetching recommendations:',
        error,
      );
      res
        .status(500)
        .json({
          error: 'Failed to analyze emotion and fetch recommendations',
          details: error.message,
        });
    }
  }
}
