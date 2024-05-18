import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173', // 프론트엔드 주소 (Vite 개발 서버 기본값)
    methods: ['POST'], // 허용할 HTTP 메서드
    credentials: true, // 쿠키 등 자격 증명 정보 허용 (필요한 경우)
  });

  await app.listen(3000); // 다른 포트로 설정하는 것을 권장 (예: 3001)
}
bootstrap();
