import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SpotifyService } from './spotify.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [SpotifyService],
  exports: [SpotifyService],
})
export class SpotifyModule {}
