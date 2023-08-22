import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from './public.decorator';


import * as dotenv from 'dotenv'

//TODO 환경변수 작업해주기. 


const config = dotenv.config().parsed 



@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) { }

  async canActivate(context: ExecutionContext,): Promise<boolean> {


    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    } // 퍼블릭이면 토큰 검증 안하고 바로 트루 제공. 이건 로그인과 회원가입에 넣어야함.


    /// 토큰 까기   
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request)


    if (!token) {
      throw new UnauthorizedException();
    }

    const payload = await this.unPackingToken(token)


    //토큰 까서 권한 검증하기
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles.includes(payload.role)) throw new HttpException('권한이 없습니다', HttpStatus.UNAUTHORIZED)



    request['body']['tokenData'] = await payload;
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private unPackingToken = async (token: string): Promise<any> | undefined => {

    let payload: any // 페이로드 객체 준비

    try {
      payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: config.JWT_PASSWORD // 이것도 환경변수 등록을 해줘야함.
        }
      );
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers

      // console.log(context.getHandler(),'지금이걸 인쇄한거임')

    } catch {
      throw new UnauthorizedException({ message: '토큰어쩌구비번잘못됨', HttpStatus: HttpStatus.BAD_REQUEST });
    }

    return payload;
  }

}