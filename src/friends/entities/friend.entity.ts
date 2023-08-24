import { Member } from "src/members/entities/member.entity";
import { PrimaryGeneratedColumn, Entity, Column, OneToMany, Unique, BeforeInsert, DeleteDateColumn, ManyToOne } from "typeorm";
import { FriendStatus } from "../dto/friend.enum";

@Entity('friends')
export class Friend {


    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Member,)
    from: Member

    @ManyToOne(() => Member)
    to: Member

    @Column({ type: 'enum', enum: FriendStatus, default: FriendStatus.APPLYING })
    status: FriendStatus
}
