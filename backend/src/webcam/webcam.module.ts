import { Module } from '@nestjs/common';
import { WebcamController } from './webcam.controller';
import { EmotionModule } from '../emotion/emotion.module';
import { SpotifyModule } from '../spotify/spotify.module';
import { TmdbModule } from '../tmdb/tmdb.module';
import { BooksModule } from '../books/books.module';

@Module({
  imports: [EmotionModule, SpotifyModule, TmdbModule, BooksModule], // 필요한 모듈들을 임포트
  controllers: [WebcamController],
})
export class WebcamModule {}
