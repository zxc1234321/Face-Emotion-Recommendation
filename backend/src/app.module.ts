import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmotionModule } from './emotion/emotion.module';
import { SpotifyModule } from './spotify/spotify.module';
import { TmdbModule } from './tmdb/tmdb.module';
import { BooksModule } from './books/books.module';
import { WebcamModule } from './webcam/webcam.module';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [
    WebcamModule,
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EmotionModule,
    SpotifyModule,
    TmdbModule,
    BooksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
