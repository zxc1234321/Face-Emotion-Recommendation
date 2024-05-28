import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { SpotifyController } from './spotify.controller';
import { SpotifyService } from './spotify.service';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [SpotifyController],
  providers: [SpotifyService],
  exports: [SpotifyService],  // SpotifyService를 내보냄
})
export class SpotifyModule {}