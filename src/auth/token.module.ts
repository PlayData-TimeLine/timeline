import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from './token.service';

@Module({
    controllers: [],
    providers: [TokenService],
    imports: [],
    exports: [TokenService]
})
export class TokenModule { }
