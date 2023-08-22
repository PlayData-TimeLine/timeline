import { Module } from "@nestjs/common";
import { MulterContorller } from "./multer.controller";
import { MulterService } from "./multer.service";

@Module({
    controllers: [MulterContorller],
    providers: [MulterService],
    imports: [],
    exports: [MulterService]
})
export class MulterModule { }