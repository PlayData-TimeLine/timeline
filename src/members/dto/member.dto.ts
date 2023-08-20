import * as bcrypt from 'bcrypt';

import {CreateMemberDto} from './create-member.dto'

import { Member } from '../entities/member.entity'
import { Builder } from 'builder-pattern'


export class MemberDto {

    constructor(createMemberDto:CreateMemberDto){

        this.name = createMemberDto.name
        this.email = createMemberDto.email
        this.password = createMemberDto.password
    }
 

    name: string;
    
    email:string;

    password:string;

    private toHashedPassword = async (pas: string): Promise<string> => {
        const pass = await bcrypt.hash(pas, 10);
        return pass;
    }


    toEntity = async(): Promise<Member> =>{

        const pass =  await this.toHashedPassword(this.password)
        
        const member = Builder(Member)
        .email(this.email)
        .password(pass)
        .name(this.name)
        .role('Member')
        .build()

        return member
    }

}