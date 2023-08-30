import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Roles } from 'src/auth/roles.decorator';
import { Request } from 'express';
import { TokenService } from 'src/auth/token.service';


@Controller('api/v1/subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService, private tokenService: TokenService) { }

  @Post()
  @Roles('Member') // 주제 등록
  async create(@Body() createSubjectDto: CreateSubjectDto, @Req() req: Request) {
    const mem = await this.tokenService.unpack(req)
    return this.subjectsService.create(createSubjectDto, + mem.id);
  }


  // @Get(':sid')
  // @Roles('Member')
  // findById(@Param() sid: number, @Req() req: Request) {
  //   const uId = req.body.tokenData.id


  //   return this.subjectsService.findById(+sid, +uId)
  // }

  @Get()
  @Roles('Member')
  findAll() {
    return this.subjectsService.findAll();
  }
  // 이걸 사용할지말지 고민중.

  @Get('/with-member/:uid') // 그 멤버가 갖고있는 모든 주제 보기
  @Roles('Member')
  async findAllbyMember(@Req() req: Request, @Param('uid') uid: number) {
    const mem = await this.tokenService.unpack(req)
    return this.subjectsService.findAllbyMember(uid);
  }
  @Get('/with-member/me') // 내 모든 주제 보기
  @Roles('Member')
  async findAllbyme(@Req() req: Request) {
    const mem = await this.tokenService.unpack(req)
    return this.subjectsService.findAllbyMember(+mem.id);
  }

  @Get('/with-member/:sid') // 주제 속으로 들어가는건데, 이건 내 생각엔 포스트로 가야함.
  @Roles('Member')
  async findAllbyMemberWithSubject(@Req() req: Request, @Param('sid') sid: number) {
    const mem = await this.tokenService.unpack(req)

    return this.subjectsService.findAllbyMemberWithSubject(+mem.id, +sid);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubjectDto: UpdateSubjectDto) {
    return this.subjectsService.update(+id, updateSubjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subjectsService.remove(+id);
  }
}
