import { Controller, Post, Body, InternalServerErrorException } from '@nestjs/common';
import { EmotionService } from '../emotion/emotion.service';
import { SpotifyService } from '../spotify/spotify.service';
import { TmdbService } from '../tmdb/tmdb.service';
import { BooksService } from '../books/books.service';

@Controller('webcam')
export class WebcamController {
  constructor(
    private readonly emotionService: EmotionService,
    private readonly spotifyService: SpotifyService,
    private readonly tmdbService: TmdbService,
    private readonly booksService: BooksService,
  ) {}

  @Post('analyze')
  async analyze(@Body() image: any) {
    try {
      const emotionResult = await this.emotionService.analyzeEmotion(image);
      console.log('Emotion Result:', emotionResult);

      if (!emotionResult || !emotionResult[0] || !emotionResult[0].emotion) {
        throw new Error('Emotion result does not contain emotion');
      }

      const dominantEmotion = emotionResult[0].emotion.dominant_emotion;

      const spotifyRecommendations = await this.spotifyService.getRecommendations(dominantEmotion);
      const tvRecommendations = await this.tmdbService.getTvRecommendations(dominantEmotion);
      const movieRecommendations = await this.tmdbService.getMovieRecommendations(dominantEmotion);
      const booksRecommendations = await this.booksService.getRecommendations(dominantEmotion);

      return {
        emotion: emotionResult,
        spotify: spotifyRecommendations,
        tv: tvRecommendations,
        movies: movieRecommendations,
        books: booksRecommendations,
      };
    } catch (error) {
      console.error('Error analyzing emotion and fetching recommendations', error);
      throw new InternalServerErrorException('Failed to analyze emotion and fetch recommendations');
    }
  }
}
