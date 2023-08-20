import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';
import { Repository } from 'typeorm';
import { MemberDto } from './dto/member.dto';
import { LoginMemberDto } from './dto/login-member.dto';
import { JwtService } from '@nestjs/jwt';

import jwt from 'jsonwebtoken'

import * as bcrypt from 'bcrypt'




@Injectable()
export class MembersService {

  constructor(@Inject('MEMBER_REPOSITORY') private memberRepository: Repository<Member>,private jwtService: JwtService){}


  async create(createMemberDto: CreateMemberDto):Promise<Member> {

   const member =  await new MemberDto(createMemberDto).toEntity()

    return await this.memberRepository.save(member);
  }

 async login(loginMemberDto: LoginMemberDto){
    const isIt = await this.findByEmail(loginMemberDto.email)

    if(!isIt) throw new HttpException("해당 메일이 없습니다",HttpStatus.BAD_REQUEST)

    const isRight = await bcrypt.compare(loginMemberDto.password,isIt.password)

    if(!isRight) throw new HttpException("비밀번호가 다릅니다.",HttpStatus.BAD_REQUEST)

    console.log(isIt)

    

    const token = await this.jwtService.signAsync({...isIt,password:''},{expiresIn:'2h',algorithm:'HS256'})

    console.log(token)

    return token


  }

  async findAll():Promise<Member[]> {
    return await this.memberRepository.find({
      relations: {
          posts: true,
      },
  })
  }

  async findByEmail(email:string){
    return await this.memberRepository.findOne(
      {
        where:{
          email:email
        }
      }
    )
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
