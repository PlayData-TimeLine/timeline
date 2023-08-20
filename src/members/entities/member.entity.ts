import { Post } from "src/posts/entities/post.entity";
import { PrimaryGeneratedColumn, Entity, Column,OneToMany } from "typeorm";

@Entity("members")
export class Member {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;

    @OneToMany(() => Post, (post) => post.member)
    posts: Post[]

}