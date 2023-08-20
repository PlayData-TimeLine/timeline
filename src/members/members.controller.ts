import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Request } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { LoginMemberDto } from './dto/login-member.dto';
import { AuthGuard } from 'src/auth/auth.guard';


@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post('/signup')
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.membersService.create(createMemberDto);
  }

  @Post('/login')
  login(@Body() login:LoginMemberDto){
    return this.membersService.login(login)
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Request() request) {

    const test2 = request.member // 위에서 내려준거 바당온거임

    console.log(test2)


    console.log(request.header('Authorization'))
    const test = request.headers


    // console.log(test,'받아와지나?')

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
