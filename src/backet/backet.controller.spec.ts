import { Test, TestingModule } from '@nestjs/testing';
import { BacketController } from './backet.controller';
import { BacketService } from './backet.service';

describe('BacketController', () => {
  let controller: BacketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BacketController],
      providers: [BacketService],
    }).compile();

    controller = module.get<BacketController>(BacketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
