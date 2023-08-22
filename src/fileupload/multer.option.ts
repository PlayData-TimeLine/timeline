import { HttpException, HttpStatus } from '@nestjs/common'
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const MulterDiskOptions = {
    fileFilter: (request, file, callback) => {
        console.log("??????????????")
        console.log(request)

        //JPG, jpeg, png 파일만
        if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
            callback(null, true);
        } else {
            callback(
                new HttpException({
                    message: 1,
                    error: "지원하지 않는 파일형식",
                },
                    HttpStatus.BAD_REQUEST,), false,);
        }
    },
    storage: diskStorage({
        destination: (request, file, callback) => {
            const uploadPath = "uploads";
            if (!existsSync(uploadPath)) {
                //없으면 폴더 생성
                mkdirSync(uploadPath);
            }
            callback(null, uploadPath);
        },
        filename: (request, file, callback) => {
            //파일 이름
            callback(null, `${Date.now()}${extname(file.originalname)}`);
        },
    }),
    limits: {
        fileNameSize: 200, //필드명 사이즈 기본값 100
        fieldSize: 1024 * 1024, //필드 사이즈 값 설정 (기본 1mb)
        fields: 2, //파일 형식이 아닌 필드의 최대 개수
        fileSize: 16777216, //multipart 형식 폼에서 최대 파일 사이즈(bytes) "16MB 설정" (기본 값 무제한)
        files: 10, //파일 최대 수 
    },
};

export const profileChangeOption = {
    fileFilter: (request, file, callback) => {
        console.log("profileChangeOption")
        //console.log(request)
        //JPG, jpeg, png 파일만
        if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
            callback(null, true);
        } else {
            callback(
                new HttpException({
                    message: 1,
                    error: "지원하지 않는 파일형식",
                },
                    HttpStatus.BAD_REQUEST,), false,);
        }
    },
    storage: diskStorage({
        destination: (request, file, callback) => {
            //console.log(request)
            const uploadPath = `profiles`;
            if (!existsSync(uploadPath)) {
                //없으면 폴더 생성
                mkdirSync(uploadPath);
            }
            callback(null, uploadPath);
        },
        filename: (request, file, callback) => {
            //파일 이름
            callback(null, `${Date.now()}${extname(file.originalname)}`);
        },
    }),
    limits: {
        fileNameSize: 200, //필드명 사이즈 기본값 100
        fieldSize: 1024 * 1024, //필드 사이즈 값 설정 (기본 1mb)
        fields: 2, //파일 형식이 아닌 필드의 최대 개수
        fileSize: 16777216, //multipart 형식 폼에서 최대 파일 사이즈(bytes) "16MB 설정" (기본 값 무제한)
        files: 1, //파일 최대 수 
    },
}


export const uploadFileURL = (fileName): string => `http://localhost:3000/${fileName}`;