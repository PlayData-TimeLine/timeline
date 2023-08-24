import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { membersProviders } from './members.provider';
import { DatabaseModule } from 'src/database/database.module';
import { JwtService } from '@nestjs/jwt';
import { TokenModule } from 'src/auth/token.module';
import { FriendsModule } from 'src/friends/friends.module';

@Module({
  controllers: [MembersController],
  providers: [MembersService, ...membersProviders],
  imports: [DatabaseModule, TokenModule, FriendsModule],
  exports: [MembersService]
})
export class MembersModule { }
