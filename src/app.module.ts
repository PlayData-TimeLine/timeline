import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MembersModule } from './members/members.module';
import { PostsModule } from './posts/posts.module';
import { DatabaseModule } from './database/database.module'
import { SubjectsModule } from './subjects/subjects.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [MembersModule, PostsModule, SubjectsModule, JwtModule.register({
    global: true,
    secret: "jwtConstants.secretawefawefvawefawe",
    signOptions: { expiresIn: '60s' },
  }),
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
