import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Request } from 'express';
import { Public } from 'src/auth/public.decorator';
import { TokenService } from 'src/auth/token.service';

@Controller('api/v1/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService, private tokenService: TokenService) { }

  @Post('/to-post/:pid')
  @Public()
  async create(@Body() createCommentDto: CreateCommentDto, @Param('pid') pId: number, @Req() req: Request) {
    const mem = await this.tokenService.unpack(req)


    return this.commentsService.create(+mem.id, pId, createCommentDto);
  }

  @Get('/to-post/:pid')
  @Public()
  async findAll(@Param('pid') pId: number) {
    return await this.commentsService.findAllOfPost(pId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
