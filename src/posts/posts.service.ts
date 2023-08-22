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
