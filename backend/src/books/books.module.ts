import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { BooksService } from './books.service';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}
