import { Builder } from "builder-pattern"
import { Member } from "src/members/entities/member.entity"
import { Post } from "src/posts/entities/post.entity"
import { Heart } from "../entities/heart.entity"

export class HeartDto {


    toEntity = (mem: Member, pos: Post) => {

        const com = Builder(Heart).member(mem).post(pos).build()

        return com
    }


}