import { Module } from '@nestjs/common';
import { WebcamService } from './webcam.service';
import { SpotifyModule } from '../spotify/spotify.module';

@Module({
  imports: [SpotifyModule],
  providers: [WebcamService],
  exports: [WebcamService],
})
export class WebcamModule {}