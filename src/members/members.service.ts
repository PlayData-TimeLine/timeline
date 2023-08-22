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

    return await this.memberRepository.save(member);
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

  findByEmail = async (email: string) => {
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
      }
    });
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }

  updateProfile = async (email: string, profilePath: string) => {
    try {
      const member = await this.findByEmail(email);

      if (!member) {
        // 이메일에 해당하는 멤버가 없을 때 처리
        return null;
      }

      member.profilePath = profilePath; // 프로필 경로 업데이트
      await this.memberRepository.save(member) // 변경된 내용을 저장
      console.log("변경완료")
    } catch (error) {
      // 오류 처리
      throw new Error(`Failed to update profile: ${error.message}`);
    }
  }
}
