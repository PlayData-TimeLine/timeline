import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { DatabaseModule } from 'src/database/database.module';
import { subjectsProviders } from './subjects.provider';
import { TokenModule } from 'src/auth/token.module';

@Module({
  controllers: [SubjectsController],
  providers: [SubjectsService, ...subjectsProviders],
  imports: [DatabaseModule, TokenModule],
})
export class SubjectsModule { }
