import { Member } from "src/members/entities/member.entity";
import { Post } from "src/posts/entities/post.entity";
import { PrimaryGeneratedColumn, Entity, Column, OneToMany, Unique, BeforeInsert, CreateDateColumn, ManyToOne } from "typeorm";

@Entity('comments')
export class Comment {

    @PrimaryGeneratedColumn()
    id: number


    @Column()
    comment: string

    @CreateDateColumn()
    createAt: Date

    @ManyToOne(() => Member, (member) => member.comments)
    member: Member

    @ManyToOne(() => Post)
    post: Post

}
