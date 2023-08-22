import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MembersModule } from './members/members.module';
import { PostsModule } from './posts/posts.module';
import { DatabaseModule } from './database/database.module'
import { SubjectsModule } from './subjects/subjects.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { FriendsModule } from './friends/friends.module';
import { CommentsModule } from './comments/comments.module';
import { HeartsModule } from './hearts/hearts.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import * as dotenv from 'dotenv'

const config = dotenv.config().parsed 

/// jwt를 전역설정함으로서, 다른곳에서 서비스만 불러서 쓰게하는것.
@Module({
  imports: [
    MembersModule,
    PostsModule,
    SubjectsModule,
    JwtModule.register({
    global: true,
    secret: config.JWT_PASSWORD, // 이 키는 환경변수로 등록해줘야함.
    signOptions: { expiresIn: config.JWT_EXPIRESIN },
    }), 
    FriendsModule, 
    CommentsModule, 
    HeartsModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal:true
    })
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },], // 앱가드로 전역적으로 제한.
})
export class AppModule { }
