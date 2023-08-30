import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Roles } from 'src/auth/roles.decorator';
import { Request } from 'express';
import { Public } from 'src/auth/public.decorator';
import { TokenService } from 'src/auth/token.service';

import { FilesInterceptor } from "@nestjs/platform-express";
import { postUploadOption } from 'src/fileupload/multer.option';

@Controller('api/v1/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService, private tokenService: TokenService) { }

  @Post() // 글쓰기
  @Roles('Member')
  // @Public()
  @UseInterceptors(FilesInterceptor('file', 1, postUploadOption)) //파일 읽어서 postUploadOption 에서 설정한 대로 저장
  async post(@UploadedFiles() file: Express.Multer.File[], @Req() req: Request, @Body('title') title: string, @Body('content') content: string, @Body('subjectNum') subjectNum: number = 0, @Body('setDate') setDate: string) {

    const mem = await this.tokenService.unpack(req)



    //body field 값으로 createdto 생성
    //객체를 보내려고 시도했는데 .... 
    const createPostDto = new CreatePostDto();
    createPostDto.title = title;
    createPostDto.content = content
    createPostDto.subjectNum = subjectNum
    createPostDto.setTime = new Date(setDate);


    if (!file || !file[0]) {
      return this.postsService.post(+mem.id, createPostDto, "");
    } else {
      return this.postsService.post(+mem.id, createPostDto, file[0].path);
    }
  }

  @Get('all') // 모든 멤버의 글을 가져오기.
  @Roles('Member')
  async findAllWithMember(@Req() req: Request) {
    const mem = await this.tokenService.unpack(req)
    return this.postsService.findAllWithMember(+mem.id);
  }

  @Get('member/:uid') // 3번 그 멤버의 글을 전부 가져오기 , 작성순서로
  @Roles('Member')
  async findAllByMember(@Param('uid') uId: number, @Req() req: Request) {

    const mem = await this.tokenService.unpack(req)

    return this.postsService.findAllByMember(+uId, +mem.id);
  }

  //2, 4번임 포스트 번호에
  @Get('/:tid') // 포스트 아이디로 글 하나 찾아오기
  @Public()
  async findOne(@Param('tid') tId: number, @Req() req: Request) {

    const mem = await this.tokenService.unpack(req)

    return this.postsService.findOne(+tId, +mem.id);
  }

  //5번. 특정 멤버의 타임라인용 글을 가져오기
  @Get('member/:uid/time-line')
  @Roles('Member')
  async findAllByMemberForTimeline(@Param('uid') uId: number, @Req() req: Request) {

    const mem = await this.tokenService.unpack(req)

    return await this.postsService.findAllByMemberForTimeline(+uId, +mem.id);
  }

  //6번. 특정 멤버의 특정 주제로 글을 가져오기
  @Get('member/:uid/time-line/:sid')
  @Roles('Member')
  findBySubjectWithMemberOfTimeline(@Param('uid') uId: number, @Param('sid') sId: number) {

    return this.postsService.findBySubjectWithMemberOfTimeline(+uId, +sId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
