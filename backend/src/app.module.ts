import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebcamController } from './webcam/webcam.controller';
import { WebcamService } from './webcam/webcam.service';
import { WebcamModule } from './webcam/webcam.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { SpotifyModule } from './spotify/spotify.module';
import { MovieModule } from './movie/movie.module';
import { DramaModule } from './drama/drama.module';
import { WebtoonModule } from './webtoon/webtoon.module';

@Module({
  imports: [WebcamModule, HttpModule, ConfigModule.forRoot(), SpotifyModule, MovieModule, DramaModule, WebtoonModule],
  controllers: [AppController, WebcamController],
  providers: [AppService, WebcamService],
})
export class AppModule {}
