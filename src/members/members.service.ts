import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';
import { Repository } from 'typeorm';
import { MemberDto } from './dto/member.dto';
import { LoginMemberDto } from './dto/login-member.dto';
import { JwtService } from '@nestjs/jwt';


import * as bcrypt from 'bcrypt'




@Injectable()
export class MembersService {

  constructor(@Inject('MEMBER_REPOSITORY') private memberRepository: Repository<Member>, private jwtService: JwtService) { }


  async signup(createMemberDto: CreateMemberDto): Promise<Member> {

    const member = await new MemberDto(createMemberDto).toEntity()


    try {

      const mem = await this.memberRepository.save(member)
      return mem;

    } catch (err) {

      throw new HttpException(`이메일 중복 `, HttpStatus.BAD_REQUEST)
    }

  }

  async login(loginMemberDto: LoginMemberDto): Promise<string> {
    const isIt = await this.findByEmail(loginMemberDto.email)

    if (!isIt) throw new HttpException("메일 혹은 비밀번호가 다릅니다.", HttpStatus.BAD_REQUEST)

    const isRight = await bcrypt.compare(loginMemberDto.password, isIt.password)

    if (!isRight) throw new HttpException("메일 혹은 비밀번호가 다릅니다.", HttpStatus.BAD_REQUEST)


    const token = await this.jwtService.signAsync({ ...isIt, password: '' }, { expiresIn: '2h', algorithm: 'HS256' })


    return token


  }

  findAll = async (): Promise<Member[]> => {
    return await this.memberRepository.find({
      relations: {
        posts: true,
      },
    })
  }

  private findById = async (id: number) => {
    return await this.memberRepository.findOne({

      where: {
        id: id
      },
    })
  }

  private findByEmail = async (email: string) => {
    return await this.memberRepository.findOne(
      {
        where: {
          email: email
        }
      }
    )
  }

  findOne = async (id: number) => {
    return await this.memberRepository.findOne({
      where: {
        id: id
      },
      select: {
        id: true,
        nickName: true,
        email: true,
        profilePath: true
      }
    });
  }


  update = async (id: number, updateMemberDto: UpdateMemberDto) => {

    // this.findById()
    // mem.

    return await this.memberRepository.update(id, updateMemberDto);
  }

  updatePassword = async (uId: number, prePass: string, newPass: string) => {
    const mem = await this.findById(uId)

    const isRight = await bcrypt.compare(prePass, mem.password)

    if (!isRight) throw new HttpException("비밀번호가 다릅니다.", HttpStatus.BAD_REQUEST)

    mem.password = await bcrypt.hash(newPass, 10) // 10은 환경변수로 가야함.

    return await this.memberRepository.update(mem.id, mem)


  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }

  updateProfile = async (uId: number, profilePath: string) => {
    try {
      const member = await this.findById(uId);

      member.profilePath = profilePath; // 프로필 경로 업데이트
      await this.memberRepository.save(member) // 변경된 내용을 저장
      console.log("변경완료")
    } catch (error) {
      // 오류 처리
      throw new HttpException(`Failed to update profile: ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
