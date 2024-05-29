import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BooksService } from './books.service';

@Module({
  imports: [ConfigModule],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}
