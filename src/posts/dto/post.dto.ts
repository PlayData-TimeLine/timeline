import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { Member } from 'src/members/entities/member.entity';
import { Subject } from 'src/subjects/entities/subject.entity';
import { Builder } from 'builder-pattern';
import { Post } from '../entities/post.entity';

export class PostDto {

    constructor(post: CreatePostDto) {


        this.title = post.title
        this.content = post.content
        this.setTime = post.setTime
    }

    title: string

    content: string

    setTime: Date


    toEntity(mem: Member, sub: Subject): Post {
        const post = Builder<Post>()
            .title(this.title)
            .content(this.content)
            .member(mem)
            .setDate(this.setTime)
            .subject(sub)
            .build()

        return post
    }

}
