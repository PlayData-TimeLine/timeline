
import { Member } from "src/members/entities/member.entity";
import { Post } from "src/posts/entities/post.entity";
import { PrimaryGeneratedColumn, Entity, Column,OneToMany,ManyToOne ,OneToOne} from "typeorm";

@Entity("subjects")
export class Subject {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;

    @ManyToOne(() => Member)
    member: Member 

    @OneToMany(() => Post, (post) => post.subject)
    posts: Post



}