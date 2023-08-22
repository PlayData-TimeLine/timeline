import { Injectable, Inject } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { MembersService } from 'src/members/members.service';
import { Member } from 'src/members/entities/member.entity';
import { databaseProviders } from 'src/database/database.providers';
import { Subject } from 'src/subjects/entities/subject.entity';
import { Builder } from 'builder-pattern';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostsService {

  constructor(
    @Inject('POST_REPOSITORY')
    private postRepository: Repository<Post>,
    private readonly membersService: MembersService) { }


  create = async (id: number, createPostDto: CreatePostDto) => {

    // this.membersService.findOne()
    const member = new Member
    member.id = id
    const subject = new Subject
    subject.id = createPostDto.subjectNum

    const post = new PostDto(createPostDto).toEntity(member, subject)


    return await this.postRepository.save(post);
  }

  findAll() {
    return `This action returns all posts`;
  }

  findAllWithMember = async () => {

    return await this.postRepository.find({
      relations: {
        member: true
      },
      select: {
        member: {
          id: true,
          nickName: true
        }
      }
    })
  }

  findAllBySubjectWithMember = async (uId: number, sId: number) => { // 내가 원하는 주제로 글을 가져오기
    const mem = new Member
    mem.id = uId

    const sub = new Subject
    sub.id = sId

    return await this.postRepository.find({

      relations: {
        member: true
      },
      where: {
        subject: sub,
        member: mem
      },
      select: {
        member: {
          id: true,
          nickName: true,
        }
      }
    })

  }

  findAllByMember = async (uId: number) => { // 그 멤버가 쓴 모든 글을 다 가져오기.
    const mem = new Member
    mem.id = uId

    return await this.postRepository.find({
      relations: {
        member: true
      },
      where: {
        member: mem
      },
      select: {
        member: {
          id: true,
          nickName: true,
        }
      }
    })
  }




  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
