import { Builder } from "builder-pattern";
import { Member } from "src/members/entities/member.entity";
import { Friend } from "../entities/friend.entity";

export class FriendDto {

    constructor(fr: Member, t: Member) {
        this.from = fr
        this.to = t
    }



    from: Member
    to: Member


    toEntity = (): Friend => {
        return Builder(Friend).from(this.from).to(this.to).build()
    }
}