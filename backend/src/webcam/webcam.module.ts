import { Module } from '@nestjs/common';
import { WebcamController } from './webcam.controller';
import { WebcamService } from './webcam.service';
import { EmotionModule } from '../emotion/emotion.module';

@Module({
  imports: [EmotionModule],
  controllers: [WebcamController],
  providers: [WebcamService],
  exports: [WebcamService],
})
export class WebcamModule {}