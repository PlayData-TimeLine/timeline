import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { DatabaseModule } from 'src/database/database.module';
import { commentsProviders } from './comments.provider';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, ...commentsProviders],
  imports: [DatabaseModule,],
})
export class CommentsModule { }
