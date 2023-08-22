import { Builder } from "builder-pattern"
import { CreateCommentDto } from "./create-comment.dto"
import { Comment } from "../entities/comment.entity"
import { Member } from "src/members/entities/member.entity"
import { Post } from "src/posts/entities/post.entity"

export class CommentDto {

    comment: string

    constructor(com: CreateCommentDto) {
        this.comment = com.comment
    }


    toEntity = (mem: Member, pos: Post) => {

        const com = Builder(Comment).member(mem).post(pos).comment(this.comment).build()

        return com
    }


}