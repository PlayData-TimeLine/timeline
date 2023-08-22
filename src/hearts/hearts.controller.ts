import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { HeartsService } from './hearts.service';
import { CreateHeartDto } from './dto/create-heart.dto';
import { Request } from 'express';
import { Public } from 'src/auth/public.decorator';
import { Roles } from 'src/auth/roles.decorator';

@Controller('api/v1/hearts')
export class HeartsController {
  constructor(private readonly heartsService: HeartsService) { }

  @Post('/to-post/:tid')
  @Roles('Member')
  hearts(@Req() req: Request, @Param('tid') tId: number) {

    const uId = req.body.tokenData.id
    return this.heartsService.hearts(uId, tId);
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
