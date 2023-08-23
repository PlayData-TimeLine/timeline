import { Injectable, Inject } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentDto } from './dto/comment.dto';
import { Member } from 'src/members/entities/member.entity';
import { Post } from 'src/posts/entities/post.entity';

import { Repository } from 'typeorm'
import { Comment } from './entities/comment.entity';
import { pid } from 'process';

@Injectable()
export class CommentsService {

  constructor(@Inject('COMMENT_REPOSITORY') private commentRepository: Repository<Comment>) { }

  create(uId: number, pId: number, createCommentDto: CreateCommentDto) {
    const mem = new Member
    mem.id = uId

    const pos = new Post
    pos.id = pId

    const com = new CommentDto(createCommentDto).toEntity(mem, pos)


    return this.commentRepository.save(com);
  }

  findAllOfPost = async (pId: number) => {
 
    return await this.commentRepository.find({

      where: {
        post: {
          id: pId
        }
      }

    });
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
