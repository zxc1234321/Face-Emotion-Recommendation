import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmotionModule } from './emotion/emotion.module';
import { SpotifyModule } from './spotify/spotify.module';
import { TmdbModule } from './tmdb/tmdb.module';
import { BooksModule } from './books/books.module';
import { WebcamModule } from './webcam/webcam.module';
import { HttpModule } from '@nestjs/axios';
import { EmotionController } from './emotion/emotion.controller';
import { WebcamController } from './webcam/webcam.controller';
import { AppController } from './app.controller';
import { WebcamService } from './webcam/webcam.service';
import { EmotionService } from './emotion/emotion.service';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

import booksConfig from './config/books.config';
import tmdbConfig from './config/tmdb.config';
import spotifyConfig from './config/spotify.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 전역 모듈로 설정
      load: [booksConfig, tmdbConfig, spotifyConfig], // 필요한 설정을 여기로 통합
    }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [`${__dirname}/**/*.entity.{ts,js}`],
      synchronize: process.env.DB_SYNC === 'true', // 불리언으로 변환
    }),
    WebcamModule,
    HttpModule,
    EmotionModule,
    SpotifyModule,
    TmdbModule,
    BooksModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController, WebcamController],
  providers: [AppService, WebcamService],
})
export class AppModule {}
