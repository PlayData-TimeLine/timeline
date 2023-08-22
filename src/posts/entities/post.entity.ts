import { Comment } from "src/comments/entities/comment.entity";
import { Heart } from "src/hearts/entities/heart.entity";
import { Member } from "src/members/entities/member.entity";
import { Subject } from "src/subjects/entities/subject.entity";
import { PrimaryGeneratedColumn, Entity, Column, ManyToOne, OneToMany, Timestamp, CreateDateColumn } from "typeorm";

@Entity("posts")
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column({ type: 'timestamp', nullable: true })
    setDate: Date;


    @CreateDateColumn()
    CreateAt: Date

    @ManyToOne(() => Member, (member) => member.posts)
    member: Member

    @ManyToOne(() => Subject, (subject) => subject.posts)
    subject: Subject

    @Column()
    imgPaths: string;

    @Column({ default: 0 })
    heartCount: number

    @OneToMany(() => Comment, (comment) => comment.post)
    comment: Comment

    @OneToMany(() => Heart, (heart) => heart.post)
    heart: Heart

}