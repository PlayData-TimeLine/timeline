import { IsNotEmpty } from "class-validator";
import { Post } from "../entities/post.entity";
import { Builder } from 'builder-pattern';
import { Member } from "src/members/entities/member.entity";
import { Subject } from "src/subjects/entities/subject.entity";


export class CreatePostDto {


    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    subjectNum: number

    setTime: Date


}