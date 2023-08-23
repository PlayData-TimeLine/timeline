import { Comment } from "src/comments/entities/comment.entity";
import { Post } from "src/posts/entities/post.entity";
import { PrimaryGeneratedColumn, Entity, Column, OneToMany, Unique, BeforeInsert, DeleteDateColumn } from "typeorm";


@Entity("members")
export class Member {



    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;


    @Column()
    name: string;

    @Column({
        name: 'email', unique: true,
    })
    email: string;

    @Column()
    nickName: string;

    @Column()
    password: string;

    @Column({ default: 'Member' })
    role: string

    @OneToMany(() => Post, (post) => post.member)
    posts: Post[]

    @OneToMany(() => Comment, (comment) => comment.member)
    comments: Comment[]

    @Column()
    profilePath: string;


}