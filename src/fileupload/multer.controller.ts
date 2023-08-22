import { Bind, Body, Controller, HttpStatus, Post, Res, UseInterceptors, Req, UploadedFile } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { multerDiskDestinationOutOptions, MulterDiskOptions } from "./multer.option";
import { Response, Request } from "express";
import { MulterService } from "./multer.service";
import { Public } from "src/auth/public.decorator";

@Controller('multer')
export class MulterContorller {

    constructor(private readonly MulterService: MulterService) { }

    @Public()
    @Post('/disk_upload1')
    @UseInterceptors(FilesInterceptor('file', 10, MulterDiskOptions))
    uploadFile(@UploadedFile() files: Array<Express.Multer.File>, @Req() req: Request) {
        console.log("///////////////////////////")
        console.log(files);

        console.log(req.files);
    }
}