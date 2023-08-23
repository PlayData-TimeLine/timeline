import { Injectable, Inject, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Request } from 'express'

import * as dotenv from 'dotenv'


const config = dotenv.config().parsed


@Injectable()
export class TokenService {

    constructor(private jwtService: JwtService) { }


    public unpack = async (request: Request) => {

        const token = this.extractTokenFromHeader(request)


        const payload = await this.unPackingToken(token)

        return payload




    }


    private extractTokenFromHeader = (request: Request): string | undefined => {
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