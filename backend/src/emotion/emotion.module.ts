import { Module } from '@nestjs/common';
import { EmotionService } from './emotion.service';
import { EmotionController } from './emotion.controller';
import { SpotifyModule } from '../spotify/spotify.module';
import { TmdbModule } from '../tmdb/tmdb.module';
import { BooksModule } from '../books/books.module';

@Module({
  imports: [SpotifyModule, TmdbModule, BooksModule],
  providers: [EmotionService],
  controllers: [EmotionController],
  exports: [EmotionService], // EmotionService를 내보냅니다.
})
export class EmotionModule {}
