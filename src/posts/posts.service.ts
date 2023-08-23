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
import { async } from 'rxjs';

@Injectable()
export class PostsService {

  constructor(
    @Inject('POST_REPOSITORY')
    private postRepository: Repository<Post>,
    private readonly membersService: MembersService) { }


  create = async (id: number, createPostDto: CreatePostDto, imgPath: string) => {

    const member = new Member
    member.id = id
    const subject = new Subject
    subject.id = createPostDto.subjectNum

    const post = new PostDto(createPostDto).toEntity(member, subject, imgPath)
    return await this.postRepository.save(post);
  }

  findAll() {
    return `This action returns all posts`;
  }

  findAllWithMember = async (uid: number) => {

    return await this.postRepository.find({
      relations: {
        member: true,
        subject: true,
        heart: true
      },
      select: {
        member: {
          id: true,
          nickName: true
        },
        subject: {
          name: true
        },

        heart: { // 뭔가 방식이 좀 구리긴 함... 차라리 하트 서비스를 찌르는게 낫나?
          isit: await this.postRepository.findOne({
            relations: {
              heart: true
            },
            where: {
              heart: {
                member: {
                  id: uid
                }
              }
            }
          }) ? true : false
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
        member: true,
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

  findOneById = async (id: number) => {
    return await this.postRepository.findOne({

      where: {
        id: id
      }
    })
  }



  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  updateWithPost = async (id: number, post: Post) => {
    return this.postRepository.update(id, post)
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
