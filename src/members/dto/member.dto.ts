import * as bcrypt from 'bcrypt';

import { CreateMemberDto } from './create-member.dto'

import { Member } from '../entities/member.entity'
import { Builder } from 'builder-pattern'
import { UpdateMemberDto } from './update-member.dto';

import * as dotenv from 'dotenv'

const config = dotenv.config().parsed 


export class MemberDto {

    name: string;
    nickname: string;

    email: string;

    password: string;

    constructor(createMemberDto: CreateMemberDto) {

        this.name = createMemberDto.name
        this.email = createMemberDto.email
        this.password = createMemberDto.password
        this.nickname = createMemberDto.nickName
    }

    private toHashedPassword = async (pas: string): Promise<string> => {
        const pass = await bcrypt.hash(pas, parseInt(config.SALT));
        return pass;
    }


    toEntity = async (): Promise<Member> => {

        const pass = await this.toHashedPassword(this.password)

        const member = Builder(Member)
            .email(this.email)
            .nickName(this.nickname)
            .password(pass)
            .name(this.name)
            .profilePath("")
            .role('Member')
            .build()

        return member
    }

}