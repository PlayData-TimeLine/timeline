import { Member } from "src/members/entities/member.entity";
import { Post } from "src/posts/entities/post.entity";
import { PrimaryGeneratedColumn, Entity, Column, OneToMany, Unique, BeforeInsert, DeleteDateColumn, ManyToOne } from "typeorm";

@Entity('hearts')
export class Heart {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    memberId: number

    @ManyToOne(() => Member, (member) => member.hearts)
    member: Member

    @ManyToOne(() => Post, (post) => post.heart)
    post: Post

}
