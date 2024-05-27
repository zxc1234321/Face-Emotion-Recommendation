import { Module } from '@nestjs/common';
import { DramaController } from './drama.controller';
import { DramaService } from './drama.service';

@Module({
  controllers: [DramaController],
  providers: [DramaService]
})
export class DramaModule {}
