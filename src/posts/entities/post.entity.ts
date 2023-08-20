import { Member } from "src/members/entities/member.entity";
import { Subject } from "src/subjects/entities/subject.entity";
import { PrimaryGeneratedColumn, Entity, Column ,ManyToOne,OneToMany } from "typeorm";

@Entity("posts")
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    content: string;

    @ManyToOne(() => Member, (member) => member.posts)
    member: Member

    @ManyToOne(()=> Subject,(subject) => subject.posts)
    subject: Subject

}