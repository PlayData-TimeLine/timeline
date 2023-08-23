import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
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
    return this.friendsService.apply(+mem.id, uId);
  }

  @Get() // 내 친구 전체 검색? 근데 이건 멤버찾기에서 쓸듯 .. 
  async findAll(@Req() req: Request) {
    const mem = await this.tokenService.unpack(req)
    return this.friendsService.findAll(+mem.id);
  }

  @Get(':id')
  @Roles('Member') // 나랑 친구인지 검사
  async findFriend(@Param('id') uId: number, @Req() req: Request) {

    const mem = await this.tokenService.unpack(req)
    return this.friendsService.findRelation(+mem.id, uId);
  }

  @Patch(':id')
  @Roles('Member')
  async update(@Param('id') uId: number, @Req() req: Request) {

    const mem = await this.tokenService.unpack(req)
    return this.friendsService.update(+mem.id, +uId);
  }

  @Delete(':id')
  async remove(@Param('id') uId: number, @Req() req: Request) {
    const mem = await this.tokenService.unpack(req)
    return this.friendsService.remove(+mem.id, +uId);
  }
}
