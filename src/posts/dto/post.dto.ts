import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { Member } from 'src/members/entities/member.entity';
import { Subject } from 'src/subjects/entities/subject.entity';
import { Builder } from 'builder-pattern';
import { Post } from '../entities/post.entity';

export class PostDto   {

    constructor(post:CreatePostDto){

        this.name = post.name
        this.content = post.content
    }

    name:string

    content:string


    toEntity(mem:Member,sub:Subject): Post {
        const  post = Builder<Post>()
        .name(this.name)
        .content(this.content)
        .member(mem)
        .subject(sub)
        .build()

      return post
  }

}
