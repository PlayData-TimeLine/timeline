import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { hostname } from 'os';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,

  })); // 전역적으로 파이프 설치. 기존에 정의되어있는것들 위주로 사용
  app.enableCors();
  await app.listen(4000);
}
bootstrap();
