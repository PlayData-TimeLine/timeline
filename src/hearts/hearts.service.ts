import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateHeartDto } from './dto/create-heart.dto';


import { Repository } from 'typeorm'
import { Heart } from './entities/heart.entity';
import { HeartDto } from './dto/heart.dto';
import { Member } from 'src/members/entities/member.entity';
import { Post } from 'src/posts/entities/post.entity';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class HeartsService {

  constructor(@Inject('HEART_REPOSITORY') private heartRepository: Repository<Heart>, private postService: PostsService) { }
  hearts = async (uid: number, tid: number) => {

    const mem = new Member
    mem.id = uid

    const pos = await this.postService.findOneById(tid)

    if (!pos) throw new HttpException("그런 글 없음", HttpStatus.BAD_REQUEST)

    const isIt = await this.findByMemberAndPost(mem, pos)

    const heart = new HeartDto().toEntity(mem, pos)
    if (isIt) {

      pos.heartCount = pos.heartCount - 1
      await this.postService.updateWithPost(pos.id, pos)

      return await this.heartRepository.delete(heart)

    } else {
      pos.heartCount = pos.heartCount + 1
      await this.postService.updateWithPost(pos.id, pos)

      return await this.heartRepository.save(heart);

    }
  }

  findAll() {
    return `This action returns all hearts`;
  }

  private findByMemberAndPost = async (mem: Member, pos: Post) => {

    return await this.heartRepository.findOne({

      where: {
        member: mem,
        post: {
          id: pos.id
        }
      }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} heart`;
  }


  remove(id: number) {
    return `This action removes a #${id} heart`;
  }
}
