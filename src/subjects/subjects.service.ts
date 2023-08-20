import { Injectable,Inject } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from './entities/subject.entity';
import { Repository } from 'typeorm';
import { Member } from 'src/members/entities/member.entity';
@Injectable()
export class SubjectsService {

  constructor(@Inject('SUBJECT_REPOSITORY') private subjectRepository:Repository<Subject>){}
  create(createSubjectDto: CreateSubjectDto) {
    return 'This action adds a new subject';
  }

  async findAll() {
    const test =  new Member()
    test.id = 2
    return await this.subjectRepository.find({
      relations: {
          posts:true
      },
      where:{
        posts:{
          member:test
        }
      }
  })
  }

  findOne(id: number) {
    return `This action returns a #${id} subject`;
  }

  update(id: number, updateSubjectDto: UpdateSubjectDto) {
    return `This action updates a #${id} subject`;
  }

  remove(id: number) {
    return `This action removes a #${id} subject`;
  }
}
