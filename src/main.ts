import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { hostname } from 'os';
import * as express from 'express';

import * as dotenv from 'dotenv'

const config = dotenv.config().parsed 

const bootstrap = async() =>{
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,

  })); // 전역적으로 파이프 설치. 기존에 정의되어있는것들 위주로 사용
  app.enableCors();
  app.use('/profiles', express.static('profiles')); //프로필 폴더 static 설정
  await app.listen(parseInt(config.PORT));

}
bootstrap();
