import * as bcrypt from 'bcrypt';

import { CreateMemberDto } from './create-member.dto'

import { Member } from '../entities/member.entity'
import { Builder } from 'builder-pattern'


export class MemberDto {

    constructor(createMemberDto: CreateMemberDto) {

        this.name = createMemberDto.name
        this.email = createMemberDto.email
        this.password = createMemberDto.password
        this.nickname = createMemberDto.nickName
    }


    name: string;
    nickname: string;

    email: string;

    password: string;

    private toHashedPassword = async (pas: string): Promise<string> => {
        const pass = await bcrypt.hash(pas, 10); // 이 소금도 뿌리기도 환경변수로 가야함.
        return pass;
    }


    toEntity = async (): Promise<Member> => {

        const pass = await this.toHashedPassword(this.password)

        const member = Builder(Member)
            .email(this.email)
            .nickName(this.nickname)
            .password(pass)
            .name(this.name)
            .role('Member')
            .build()

        return member
    }

}