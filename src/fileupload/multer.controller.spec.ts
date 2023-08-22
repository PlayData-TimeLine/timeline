import { Test, TestingModule } from "@nestjs/testing";
import { MulterContorller } from "./multer.controller";
import { MulterService } from "./multer.service";

describe('MulterContorller', () => {
    let controller: MulterContorller;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [MulterContorller],
            providers: [MulterService],
        }).compile();

        controller = module.get<MulterContorller>(MulterContorller);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});