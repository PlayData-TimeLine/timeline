import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Request as test } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { LoginMemberDto } from './dto/login-member.dto';
import { Roles } from 'src/auth/roles.decorator';
import { Public } from 'src/auth/public.decorator';
import { Request } from 'express';
import { updatePassword } from './dto/update-password.dto';


@Controller('api/v1/members')
export class MembersController {
  constructor(private readonly membersService: MembersService) { }

  @Post('/signup')
  @Public()
  signup(@Body() createMemberDto: CreateMemberDto) {
    return this.membersService.signup(createMemberDto);
  }

  @Post('/login')
  @Public()
  login(@Body() login: LoginMemberDto) {


    return this.membersService.login(login)
  }

  @Get('/me')
  @Roles('Member')
  findAll(@Req() request: Request) {
    const uID = request.body.tokenData.id // 위에서 내려준거 바당온거임 이거 쓰면될듯.
    return this.membersService.findOne(+uID);
  }

  @Get(':id')
  @Roles('Admin') //회원한명 찾기. 어드민 전용
  findOne(@Param('id') id: number) {
    return this.membersService.findOne(+id);
  }

  @Patch('/me/edit')
  @Roles('Member')
  update(@Param('id') id: number, @Body() updateMemberDto: UpdateMemberDto) {
    return this.membersService.update(+id, updateMemberDto);
  }


  @Patch('/me/pass-edit')
  @Roles('Member')
  updatePassword(@Req() request: Request, @Body() updatePassword: updatePassword) {
    const uID = request.body.tokenData.id
    return this.membersService.updatePassword(+uID, updatePassword.prePassword, updatePassword.newpassword)
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.membersService.remove(+id);
  }
}
