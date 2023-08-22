import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Request as test, UseInterceptors, UploadedFile } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { LoginMemberDto } from './dto/login-member.dto';
import { Roles } from 'src/auth/roles.decorator';
import { Public } from 'src/auth/public.decorator';
import { Request } from 'express';
import { FilesInterceptor } from "@nestjs/platform-express";
import { MulterDiskOptions, profileChangeOption } from 'src/fileupload/multer.option';
import { request } from 'http';


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

  @Get()
  @Roles('Member')
  findAll(@Req() request: Request) {

    const test2 = request.headers.member // 위에서 내려준거 바당온거임 이거 쓰면될듯.
    console.log(test2)
    return this.membersService.findAll();
  }

  @Get(':id')
  @Roles('Admin') //회원한명 찾기. 
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

  @Post('/changeProfile')
  //@Roles('Member')
  @Public()
  @UseInterceptors(FilesInterceptor('file', 10, profileChangeOption))
  changeProfile(@UploadedFile() file: Express.Multer.File, @Body('email') email: string, @Req() req: Request) {
    if (req.files === null) {
      return null;
    } else {
      return this.membersService.updateProfile(email, req.files[0].path)
    }
  }
}
