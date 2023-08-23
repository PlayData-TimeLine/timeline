import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Request } from 'express';
import { Public } from 'src/auth/public.decorator';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @Post('/to-post/:pid')
  @Public()
  create(@Body() createCommentDto: CreateCommentDto, @Param('pid') pId: number, @Req() req: Request) {
    const uId = req.body.tokenData


    return this.commentsService.create(uId, pId, createCommentDto);
  }

  @Get('to-post/:pid')
  findAll(@Param('pid') pId: number) {
    return this.commentsService.findAllOfPost();
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
