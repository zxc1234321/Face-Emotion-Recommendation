import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmotionModule } from './emotion/emotion.module';
import { SpotifyModule } from './spotify/spotify.module';
import { TmdbModule } from './tmdb/tmdb.module';
import { BooksModule } from './books/books.module';
import { WebcamModule } from './webcam/webcam.module';
import { HttpModule } from '@nestjs/axios';
import { EmotionController } from './emotion/emotion.controller';
import { WebcamController } from './webcam/webcam.controller';
import { AppController } from './app.controller';
import { WebcamService } from './webcam/webcam.service';
import { EmotionService } from './emotion/emotion.service';
import { AppService } from './app.service';

import booksConfig from './config/books.config';
import tmdbConfig from './config/tmdb.config';
import spotifyConfig from './config/spotify.config';

@Module({
  imports: [
    WebcamModule,
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [booksConfig, tmdbConfig, spotifyConfig],
    }),
    EmotionModule,
    SpotifyModule,
    TmdbModule,
    BooksModule,
  ],
  controllers: [AppController, WebcamController],
  providers: [AppService, WebcamService],
})
export class AppModule {}
