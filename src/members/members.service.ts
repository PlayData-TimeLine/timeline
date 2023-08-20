import { Inject, Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';
import { Repository } from 'typeorm';


@Injectable()
export class MembersService {

  constructor(@Inject('MEMBER_REPOSITORY') private memberRepository: Repository<Member>){}


  async create(createMemberDto: CreateMemberDto):Promise<Member> {
    return await this.memberRepository.save(createMemberDto);
  }

  async findAll():Promise<Member[]> {
    return await this.memberRepository.find({
      relations: {
          posts: true,
      },
  })
  }

  findOne(id: number) {
    return `This action returns a #${id} member`;
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }
}
