import { IsEmail, IsNotEmpty} from "class-validator";


export class CreateMemberDto {

    @IsNotEmpty()
    name: string;
    


    @IsEmail()
    email:string;

    @IsNotEmpty()
    password:string;


}