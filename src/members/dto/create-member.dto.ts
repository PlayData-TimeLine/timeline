import { IsEmail, IsNotEmpty } from "class-validator";


export class CreateMemberDto {

    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    nickName: string

    @IsNotEmpty()
    password: string;


}