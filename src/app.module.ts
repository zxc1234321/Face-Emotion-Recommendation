import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebcamController } from './webcam/webcam.controller';
import { WebcamService } from './webcam/webcam.service';
import { WebcamModule } from './webcam/webcam.module';


@Module({
  imports: [WebcamModule],
  controllers: [AppController, WebcamController],
  providers: [AppService, WebcamService],
})
export class AppModule {}
