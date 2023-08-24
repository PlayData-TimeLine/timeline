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


    return await this.subjectRepository.find({
      relations: {
        posts: true
      }
    })
  }

  findAllbyMember = async (id: number) => { //이건 그 멤버가 갖고있는 모든 글을 보는것
 
    return await this.subjectRepository.find({
      where: {
        member: {
          id:id
        }
      }
    })
  }

  findAllbyMemberWithSubject = async (uid: number, sid: number) => { // 특정 주제를 보는것 // 근데 이건 포스트로 가야할듯 


    return await this.subjectRepository.find({
      relations: {
        posts: true
      },
      where: {
        posts: {
          member: {
            id:uid
          },
          subject: {
            id:sid
          }
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
