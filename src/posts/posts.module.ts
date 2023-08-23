import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { postsProviders } from './posts.provider';
import { DatabaseModule } from 'src/database/database.module';
import { MembersService } from 'src/members/members.service';
import { MembersModule } from 'src/members/members.module';
import { TokenModule } from 'src/auth/token.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService, ...postsProviders],
  imports: [DatabaseModule, MembersModule, TokenModule],
  exports: [PostsService]
})
export class PostsModule { }
