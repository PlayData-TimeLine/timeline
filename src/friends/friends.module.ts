import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { friendsProviders } from './friends.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [FriendsController],
  providers: [FriendsService, ...friendsProviders],
  imports: [DatabaseModule]
})
export class FriendsModule { }
