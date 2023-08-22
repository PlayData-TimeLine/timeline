import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseInterceptors } from '@nestjs/common';
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

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
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
