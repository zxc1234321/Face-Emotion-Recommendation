import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BooksService } from './books.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}
