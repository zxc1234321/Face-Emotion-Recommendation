import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { WebcamModule } from './webcam/webcam.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), WebcamModule],
  controllers: [AppController],
})
export class AppModule {}
