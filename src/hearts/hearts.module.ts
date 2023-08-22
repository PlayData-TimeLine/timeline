import { Module } from '@nestjs/common';
import { HeartsService } from './hearts.service';
import { HeartsController } from './hearts.controller';
import { heartsProviders } from './hearts.provider';
import { DatabaseModule } from 'src/database/database.module';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  controllers: [HeartsController],
  providers: [HeartsService, ...heartsProviders],
  imports: [DatabaseModule, PostsModule]
})
export class HeartsModule { }
