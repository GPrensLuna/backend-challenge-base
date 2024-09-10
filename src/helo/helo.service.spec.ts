import { Test, TestingModule } from '@nestjs/testing';
import { HeloService } from './helo.service';

describe('HeloService', () => {
  let service: HeloService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeloService],
    }).compile();

    service = module.get<HeloService>(HeloService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
