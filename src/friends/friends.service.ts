import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { Repository } from 'typeorm';
import { Friend } from './entities/friend.entity';
import { FriendStatus } from './dto/friend.enum';
import { Member } from 'src/members/entities/member.entity';
import { FriendDto } from './dto/friend.dto';
import { FriendResponseStatus } from './dto/friendResponse.enum';

@Injectable()
export class FriendsService {

  constructor(@Inject('FRIEND_REPOSITORY') private friendsRepository: Repository<Friend>,) {

  }

  apply = async (mId: number, uId: number) => {



    const isIt = await this.findRelation(mId, uId)

    if (isIt === FriendResponseStatus.NOTFRIEND.valueOf()) {

      const you = new Member
      you.id = uId

      const me = new Member
      me.id = mId

      const friend = new FriendDto(me, you).toEntity()

      return this.friendsRepository.save(friend)
    } else {

      return new HttpException("이미 존재합니다", HttpStatus.BAD_REQUEST)
    }


  }

  findAll(mId: number) {
    return `This action returns all friends`;
  }

  findRelation = async (yourId: number, uid: number) => {
    const fromMe = await this.friendsRepository.findOne({
      where: {
        from: {
          id: yourId
        },
        to: {
          id: uid
        }
      }
    });

    const toMe = await this.friendsRepository.findOne({
      where: {
        from: {
          id: yourId
        },
        to: {
          id: uid
        }
      }
    });


    if (!fromMe && !toMe) return FriendResponseStatus.NOTFRIEND
    else if (!toMe && fromMe.status === FriendStatus.APPLYING) return FriendResponseStatus.APPLYING
    else if (toMe.status === FriendStatus.APPLYING && !fromMe) return FriendResponseStatus.REQUEST
    else return FriendResponseStatus.FRIEND

  }

  findById = async (to: number, from: number) => {
    return await this.friendsRepository.findOne({
      where: {
        from: {
          id: from
        },
        to: {
          id: to
        }
      }
    })
  }

  update = async (mid: number, uId: number) => {
    const relations = await this.findById(mid, uId)

    return this.friendsRepository.update(relations.id, {
      status: FriendStatus.FRIEND

    });
  }

  remove = async (mId: number, uId: number) => {

    const friend = await this.findById(uId, mId)
    return this.friendsRepository.delete(friend);
  }
}
