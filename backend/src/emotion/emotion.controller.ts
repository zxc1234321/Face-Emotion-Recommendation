import { Controller, Get, Query, Res } from '@nestjs/common';
import { SpotifyService } from '../spotify/spotify.service';
import { TmdbService } from '../tmdb/tmdb.service';
import { BooksService } from '../books/books.service';
import { Response } from 'express';

@Controller('emotion')
export class EmotionController {
  constructor(
    private readonly spotifyService: SpotifyService,
    private readonly tmdbService: TmdbService,
    private readonly booksService: BooksService,
  ) {}

  @Get('music')
  async getMusicRecommendations(@Query('emotion') emotion: string, @Res() res: Response) {
    try {
      const recommendations = await this.spotifyService.getRecommendations(emotion);
      res.json(recommendations);
    } catch (error) {
      console.error('Error fetching Spotify recommendations:', error);
      res.status(500).json({ error: 'Failed to fetch Spotify recommendations', details: error.message });
    }
  }

  @Get('movie')
  async getMovieRecommendations(@Query('emotion') emotion: string, @Res() res: Response) {
    try {
      const recommendations = await this.tmdbService.getMovieRecommendations(emotion);
      res.json(recommendations);
    } catch (error) {
      console.error('Error fetching movie recommendations:', error);
      res.status(500).json({ error: 'Failed to fetch movie recommendations', details: error.message });
    }
  }

  @Get('drama')
  async getTvRecommendations(@Query('emotion') emotion: string, @Res() res: Response) {
    try {
      const recommendations = await this.tmdbService.getTvRecommendations(emotion);
      res.json(recommendations);
    } catch (error) {
      console.error('Error fetching TV recommendations:', error);
      res.status(500).json({ error: 'Failed to fetch TV recommendations', details: error.message });
    }
  }

  @Get('books')
  async getBookRecommendations(@Query('emotion') emotion: string, @Res() res: Response) {
    try {
      const recommendations = await this.booksService.getRecommendations(emotion);
      res.json(recommendations);
    } catch (error) {
      console.error('Error fetching book recommendations:', error);
      res.status(500).json({ error: 'Failed to fetch book recommendations', details: error.message });
    }
  }
}
