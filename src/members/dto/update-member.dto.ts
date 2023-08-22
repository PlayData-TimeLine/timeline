import { PartialType } from '@nestjs/mapped-types';
import { CreateMemberDto } from './create-member.dto';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateMemberDto {


    name: string;

    @IsEmail()
    email: string;

    nickName: string

}
