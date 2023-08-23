import { Module, forwardRef } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { friendsProviders } from './friends.provider';
import { DatabaseModule } from 'src/database/database.module';
import { MembersModule } from 'src/members/members.module';
import { TokenModule } from 'src/auth/token.module';

@Module({
  controllers: [FriendsController],
  providers: [FriendsService, ...friendsProviders],
  imports: [DatabaseModule, TokenModule],
  exports: [FriendsService]
})
export class FriendsModule { }
