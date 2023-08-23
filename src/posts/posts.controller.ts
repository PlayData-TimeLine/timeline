import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseInterceptors } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Roles } from 'src/auth/roles.decorator';
import { Request } from 'express';
import { Public } from 'src/auth/public.decorator';
import { TokenService } from 'src/auth/token.service';


@Controller('api/v1/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService, private tokenService: TokenService) { }

  @Post() // 글쓰기
  @Roles('Member')
  async create(@Req() req: Request, @Body() createPostDto: CreatePostDto) {

    const mem = await this.tokenService.unpack(req)

    return this.postsService.create(mem.id, createPostDto);
  }

  @Get('all') // 모든 멤버의 글을 가져오기.
  // @Roles('Member')
  @Public()
  findAllWithMember(@Req() req: Request) {
    // const uid = req.body.tokenData.id
    return this.postsService.findAllWithMember(5);
  }

  @Get('member/:uid') // 그 멤버에 맞는 글을 가져오기
  @Roles('Member')
  findAllByMember(@Param('uid') uId: number) {

    return this.postsService.findAllByMember(+uId);
  }

  @Get('member/:uid/subject/:sid') // 그 멤버의 주제로 글을 가져오기
  @Roles('Member')
  findAllBySubjectWithMember(@Param('uid') uId: number, @Param('sid') sId: number) {

    return this.postsService.findAllBySubjectWithMember(+uId, +sId);
  }





  @Get('post/:id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
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
