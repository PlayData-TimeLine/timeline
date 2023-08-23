import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Request as test, UseInterceptors, UploadedFile, UploadedFiles, HttpException, HttpStatus } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { LoginMemberDto } from './dto/login-member.dto';
import { Roles } from 'src/auth/roles.decorator';
import { Public } from 'src/auth/public.decorator';
import { Request } from 'express';
import { updatePassword } from './dto/update-password.dto';
import { FilesInterceptor } from "@nestjs/platform-express";
import { profileChangeOption } from 'src/fileupload/multer.option';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/auth/token.service';


@Controller('api/v1/members')
@Roles('Member')
export class MembersController {
  constructor(private readonly membersService: MembersService, private tokenService: TokenService) { }

  @Post('/signup')
  @Public()
  signup(@Body() createMemberDto: CreateMemberDto) {
    return this.membersService.signup(createMemberDto);
  }

  @Post('/login')
  @Public()
  async login(@Body() login: LoginMemberDto) {
    return await this.membersService.login(login)
  }

  @Get('/me')
  @Roles('Member')
  async findAll(@Req() req: Request) {

    const mem = await this.tokenService.unpack(req)

    return this.membersService.findOne(+mem.id);
  }

  @Get(':id')
  @Roles('Admin') //회원한명 찾기. 어드민 전용
  findOne(@Param('id') id: number) {
    return this.membersService.findOne(+id);
  }

  @Patch('/me/edit')
  @Roles('Member')
  async update(@Req() req: Request, @Body() updateMemberDto: UpdateMemberDto) {

    const mem = await this.tokenService.unpack(req)

    return this.membersService.update(mem.id, updateMemberDto);
  }


  @Patch('/me/pass-edit')
  @Roles('Member')
  async updatePassword(@Req() req: Request, @Body() updatePassword: updatePassword) {

    const mem = await this.tokenService.unpack(req)


    return this.membersService.updatePassword(+mem.id, updatePassword.prePassword, updatePassword.newpassword)
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.membersService.remove(+id);
  }

  //임시로 roles 는 public
  @Post('/changeProfile')
  @Roles('Member')
  @UseInterceptors(FilesInterceptor('file', 1, profileChangeOption)) //파일 읽어서 prfilechangeoption 에서 설정한 대로 저장
  async changeProfile(@UploadedFiles() file: Express.Multer.File[], @Req() req: Request) {
    const mem = await this.tokenService.unpack(req)

    if (file === null) {
      return new HttpException("잘못된 file", HttpStatus.BAD_REQUEST);
    } else {
      //email 하고 fileinterceptor 를 통과한 파일 경로를 넣어서 저장
      return await this.membersService.updateProfile(mem.id, file[0].path)
    }
  }
}
