import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { DatabaseModule } from 'src/database/database.module';
import { subjectsProviders } from './subjects.provider';

@Module({
  controllers: [SubjectsController],
  providers: [SubjectsService,...subjectsProviders],
  imports:[DatabaseModule],
})
export class SubjectsModule {}
