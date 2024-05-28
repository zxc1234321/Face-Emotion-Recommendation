import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options: CorsOptions = {
    origin: "*",
    methods: "GET, POST",
    allowedHeaders: "*",
  };
  app.enableCors(options);
  await app.listen(3000);
}
bootstrap();
