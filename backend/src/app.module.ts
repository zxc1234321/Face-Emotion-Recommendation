import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebcamController } from './webcam/webcam.controller';
import { WebcamService } from './webcam/webcam.service';
import { WebcamModule } from './webcam/webcam.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [WebcamModule, HttpModule, ConfigModule.forRoot({isGlobal: true,})],
  controllers: [AppController, WebcamController],
  providers: [AppService, WebcamService],
})
export class AppModule {}
