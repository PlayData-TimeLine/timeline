import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // 전역적으로 파이프 설치. 기존에 정의되어있는것들 위주로 사용
  await app.listen(3000);
}
bootstrap();
