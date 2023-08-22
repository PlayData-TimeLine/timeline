import { IsNotEmpty } from "class-validator"

export class updatePassword {


    @IsNotEmpty()
    prePassword: string

    @IsNotEmpty()
    newpassword: string

}