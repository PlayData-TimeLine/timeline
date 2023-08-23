import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { HeartsService } from './hearts.service';
import { CreateHeartDto } from './dto/create-heart.dto';
import { Request } from 'express';
import { Public } from 'src/auth/public.decorator';
import { Roles } from 'src/auth/roles.decorator';
import { TokenService } from 'src/auth/token.service';

@Controller('api/v1/hearts')
export class HeartsController {
  constructor(private readonly heartsService: HeartsService, private tokenService: TokenService) { }

  @Post('/to-post/:tid')
  // @Roles('Member')
  @Public()
  async hearts(@Req() req: Request, @Param('tid') tId: number) {

    const mem = await this.tokenService.unpack(req)

    return this.heartsService.hearts(mem.id, tId);
  }


  // @Get()
  // findAll() {
  //   return this.heartsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.heartsService.findOne(+id);
  // }


  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.heartsService.remove(+id);
  // }
}
