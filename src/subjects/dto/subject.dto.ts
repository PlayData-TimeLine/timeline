import { Member } from "src/members/entities/member.entity";
import { CreateSubjectDto } from "./create-subject.dto";
import { Builder } from "builder-pattern";
import { Subject } from "../entities/subject.entity";

export class SubjectDto {

    constructor(createSubjectDto: CreateSubjectDto) {
        this.name = createSubjectDto.name

    }

    name: string


    toEntity = (mem: Member): Subject => {

        const sub = Builder(Subject).name(this.name).member(mem).build()

        return sub
    }



}