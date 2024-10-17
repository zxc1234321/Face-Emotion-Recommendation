import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TmdbService } from './tmdb.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule,HttpModule],
  providers: [TmdbService],
  exports: [TmdbService],
})
export class TmdbModule {}
