import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Request } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { LoginMemberDto } from './dto/login-member.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Public } from 'src/auth/public.decorator';


@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) { }

  @Post('/signup')
  @Public()
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.membersService.create(createMemberDto);
  }

  @Post('/login')
  @Public()
  login(@Body() login: LoginMemberDto) {
    console.log(1)
    return this.membersService.login(login)
  }

  @Get()
  // @UseGuards(AuthGuard) // 이걸 따로 빼든지 해야하는데... 어짜피 회원가입과 로그인 페이지만 제한걸기??
  @Roles('Member')
  findAll(@Request() request) {

    const test2 = request.member // 위에서 내려준거 바당온거임 이거 쓰면될듯.


    return this.membersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.membersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.membersService.update(+id, updateMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.membersService.remove(+id);
  }
}
