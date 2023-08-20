import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { membersProviders } from './members.provider';
import { DatabaseModule } from 'src/database/database.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [MembersController],
  providers: [MembersService ,...membersProviders],
  imports:[DatabaseModule,],
  exports:[MembersService]
})
export class MembersModule {}
