import { Module } from '@nestjs/common';
import { WebcamController } from './webcam.controller';
import { WebcamService } from './webcam.service';

@Module({
  imports: [],
  controllers: [WebcamController],
  providers: [WebcamService],
  exports: [WebcamService],
})
export class WebcamModule {}