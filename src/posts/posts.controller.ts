import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Roles } from 'src/auth/roles.decorator';
import { Request } from 'express';


@Controller('api/v1/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Post()
  @Roles('Member')
  create(@Req() req: Request, @Body() createPostDto: CreatePostDto) {

    const uid = req.body.tokenData.id
    return this.postsService.create(+uid, createPostDto);
  }

  @Get('all')
  @Roles('Member')
  findAllWithMember() {
    return this.postsService.findAllWithMember();
  }

  @Get('member/:uid')
  @Roles('Member')
  findAllByMember(@Param('uid') uId: number) {

    return this.postsService.findAllByMember(+uId);
  }

  @Get('member/:uid/subject/:sid')
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
