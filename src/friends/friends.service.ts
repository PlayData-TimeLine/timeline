import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { Not, Repository } from 'typeorm';
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
          id: uid
        },
        to: {
          id: yourId
        }
      }
    });


    if (!fromMe && !toMe) return FriendResponseStatus.NOTFRIEND
    else if (!toMe && fromMe.status === FriendStatus.APPLYING) return FriendResponseStatus.APPLYING
    else if (toMe.status === FriendStatus.APPLYING && !fromMe) return FriendResponseStatus.REQUEST
    else return FriendResponseStatus.FRIEND

  }

  findByIds = async (to: number, from: number) => {
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

  isHeFriend =async (to: number, from: number):Promise<string> => {

    const how = await this.friendsRepository.exist({
  where:{
    to:{

      id:to
    },
    from:{
      id:from
    },
    status:FriendStatus.FRIEND
  }
      
    })


    if(how ) return FriendResponseStatus.FRIEND
    else return FriendResponseStatus.NOTFRIEND
    
  }


  update = async (mid: number, uId: number) => {
    const relations = await this.findByIds(mid, uId)

    if(!relations) throw new HttpException("잘못된 접근입니다.",HttpStatus.BAD_REQUEST)


    const from =  new Member
    from.id = mid

    const to = new Member
    to.id = uId

    const mem = new FriendDto(from,to).toFriend()

    await this.friendsRepository.save(mem)

    return this.friendsRepository.update(relations.id, {
      status: FriendStatus.FRIEND

    });
  }

  remove = async (mId: number, uId: number) => {

    const friendFrom = await this.findByIds(uId, mId)
    const friendTo = await this.findByIds(mId,uId)


    return this.friendsRepository.delete([friendFrom.id,friendTo.id]);
  }

  findMyFriend =async (uId:number):Promise<Friend[]> => {

    return await this.friendsRepository.find({
      where:{
        from:{
          id:uId
        }
      }
    })
    
  }

  findMyFriendNum =async (uId:number):Promise<Friend[]> => {


    const from = new Member()

    from.id = uId

    return await this.friendsRepository.find({
      relations:{
        to:true
      },

      select:{
        to:{
          id:true
        }
      },
  
      where:{
        to:{
          id:uId,
        },
        status:FriendStatus.FRIEND
      }
    })
  
    
  }
}
