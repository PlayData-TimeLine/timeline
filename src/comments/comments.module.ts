import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { DatabaseModule } from 'src/database/database.module';
import { commentsProviders } from './comments.provider';
import { TokenModule } from 'src/auth/token.module';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, ...commentsProviders],
  imports: [DatabaseModule, TokenModule],
})
export class CommentsModule { }
