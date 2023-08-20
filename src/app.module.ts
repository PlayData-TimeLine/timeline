import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MembersModule } from './members/members.module';
import { PostsModule } from './posts/posts.module';
import { DatabaseModule } from './database/database.module'
import { SubjectsModule } from './subjects/subjects.module';
import { JwtModule } from '@nestjs/jwt';

/// jwt를 전역설정함으로서, 다른곳에서 서비스만 불러서 쓰게하는것.
@Module({
  imports: [MembersModule, PostsModule, SubjectsModule, JwtModule.register({
    global: true,
    secret: "jwtConstants.secretawefawefvawefawe", // 이 키는 환경변수로 등록해줘야함.
    signOptions: { expiresIn: '2h' },
  }),
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
