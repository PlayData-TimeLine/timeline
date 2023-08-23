import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { membersProviders } from './members.provider';
import { DatabaseModule } from 'src/database/database.module';
import { JwtService } from '@nestjs/jwt';
import { TokenModule } from 'src/auth/token.module';

@Module({
  controllers: [MembersController],
  providers: [MembersService, ...membersProviders],
  imports: [DatabaseModule, TokenModule],
  exports: [MembersService]
})
export class MembersModule { }
