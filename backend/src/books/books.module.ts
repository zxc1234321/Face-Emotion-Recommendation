import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios'; // HttpModule을 임포트
import { BooksService } from './books.service';

@Module({
  imports: [ConfigModule, HttpModule], // ConfigModule과 HttpModule을 임포트
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}
