import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios'; // HttpModule을 임포트
import { TmdbService } from './tmdb.service';

@Module({
  imports: [ConfigModule, HttpModule], // ConfigModule과 HttpModule을 임포트
  providers: [TmdbService],
  exports: [TmdbService],
})
export class TmdbModule {}
