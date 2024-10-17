import { Module } from '@nestjs/common';
import { WebcamController } from './webcam.controller';
import { WebcamService } from './webcam.service';
import { EmotionModule } from '../emotion/emotion.module';
import { SpotifyModule } from '../spotify/spotify.module';
import { TmdbModule } from '../tmdb/tmdb.module';
import { BooksModule } from '../books/books.module';

@Module({
  imports: [EmotionModule,SpotifyModule,TmdbModule,BooksModule],
  controllers: [WebcamController],
  providers: [WebcamService],
  exports: [WebcamService],
})
export class WebcamModule {}