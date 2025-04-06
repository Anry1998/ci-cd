import { Test, TestingModule } from '@nestjs/testing';
import { BacketService } from './backet.service';

describe('BacketService', () => {
  let service: BacketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BacketService],
    }).compile();

    service = module.get<BacketService>(BacketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
