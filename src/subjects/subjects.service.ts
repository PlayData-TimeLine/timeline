import { Injectable, Inject } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from './entities/subject.entity';
import { Repository } from 'typeorm';
import { Member } from 'src/members/entities/member.entity';
import { SubjectDto } from './dto/subject.dto';
@Injectable()
export class SubjectsService {

  constructor(@Inject('SUBJECT_REPOSITORY') private subjectRepository: Repository<Subject>) { }


  create = async (createSubjectDto: CreateSubjectDto, id: number) => {
    const mem = new Member()
    mem.id = id

    const sub = new SubjectDto(createSubjectDto).toEntity(mem)

    return await this.subjectRepository.save(sub);
  }

  findById = async (sId: number, uId: number) => {
    const mem = new Member
    mem.id = uId

    return await this.subjectRepository.findOne({
      relations: {
        posts: true
      },
      where: {
        id: sId
      }
    })

  }

  findAll = async () => {
    const test = new Member()
    test.id = 2
    return await this.subjectRepository.find({
      relations: {
        posts: true
      }
    })
  }

  findAllbyMember = async (id: number) => {
    const mem = new Member()
    mem.id = id

    return await this.subjectRepository.find({
      relations: {
        posts: true
      },
      where: {
        posts: {
          member: mem
        }
      }
    });
  }

  update(id: number, updateSubjectDto: UpdateSubjectDto) {
    return `This action updates a #${id} subject`;
  }

  remove(id: number) {
    return `This action removes a #${id} subject`;
  }
}
