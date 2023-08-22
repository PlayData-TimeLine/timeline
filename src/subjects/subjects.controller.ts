import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Roles } from 'src/auth/roles.decorator';
import { Request } from 'express';


@Controller('api/v1/subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) { }

  @Post()
  @Roles('Member')
  create(@Body() createSubjectDto: CreateSubjectDto, @Req() req: Request) {

    const mem = req.body.tokenData;
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

  @Get('/with-member')
  @Roles('Member')
  findAllbyMember(@Req() req: Request) {

    const mem = req.body.tokenData;

    return this.subjectsService.findAllbyMember(+mem.id);
  }

  @Get('/with-member/:sid')
  @Roles('Member')
  findAllbyMemberWithSubject(@Req() req: Request, @Param('sid') sid: number) {
    const mem = req.body.tokenData;

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
