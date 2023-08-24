import { Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpException, HttpStatus } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { TokenService } from 'src/auth/token.service';

import { Request } from 'express'
import { Public } from 'src/auth/public.decorator';
import { Roles } from 'src/auth/roles.decorator';

@Controller('api/v1/friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService, private tokenService: TokenService) { }

  @Post(':id') // 친구신청
  @Roles('Member')
  async apply(@Req() req: Request, @Param('id') uId: number) {




    const mem = await this.tokenService.unpack(req)



    if(mem.id === uId) throw new HttpException('잘못된 요청입니다',HttpStatus.BAD_REQUEST)

    return this.friendsService.apply(+mem.id, uId);
  }



  @Get(':id')
  @Roles('Member') // 나랑 친구인지 검사
  async findFriend(@Param('id') uId: number, @Req() req: Request) {

    const mem = await this.tokenService.unpack(req)

    if(mem.id === uId) throw new HttpException('잘못된 요청입니다',HttpStatus.BAD_REQUEST)
    return this.friendsService.isHeFriend(+mem.id, uId);
  }

  @Patch(':id')
  @Roles('Member') // 친구 승인
  async update(@Param('id') uId: number, @Req() req: Request) {

    const mem = await this.tokenService.unpack(req)

    if(mem.id === uId) throw new HttpException('잘못된 요청입니다',HttpStatus.BAD_REQUEST)
    return this.friendsService.update(+mem.id, +uId);
  }

  @Delete(':id')
  @Roles('Member') // 친구 삭제
  async remove(@Param('id') uId: number, @Req() req: Request) {
    const mem = await this.tokenService.unpack(req)

    if(mem.id === uId) throw new HttpException('잘못된 요청입니다',HttpStatus.BAD_REQUEST)

    return this.friendsService.remove(+mem.id, +uId);
  }

  @Get()
  @Roles('Member') // 내 친구 전체 찾기
  async findMyAllFriend(@Req() req: Request){
    const mem = await this.tokenService.unpack(req)

    return this.friendsService.findMyFriend(+mem.id)
  }

  @Get('/of-num')
  @Roles('Member') // 내 친구 전체 찾기
  async findMyFriendNum(@Req() req: Request){
    const mem = await this.tokenService.unpack(req)

    return this.friendsService.findMyFriendNum(+mem.id)
  }
}
