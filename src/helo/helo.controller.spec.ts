import { Test, TestingModule } from '@nestjs/testing';
import { HeloController } from './helo.controller';
import { HeloService } from './helo.service';

describe('HeloController', () => {
  let controller: HeloController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeloController],
      providers: [HeloService],
    }).compile();

    controller = module.get<HeloController>(HeloController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
