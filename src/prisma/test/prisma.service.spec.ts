import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";
import { PrismaService } from "../prisma.service";
import { PrismaClient } from "@prisma/client";

describe("PrismaService", () => {
  let service: PrismaService;
  let prismaClientConnectSpy: jest.SpyInstance;

  beforeEach(async () => {
    prismaClientConnectSpy = jest
      .spyOn(PrismaClient.prototype, "$connect")
      .mockResolvedValue(undefined);

    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should call $connect on initialization", async () => {
    await service.onModuleInit();
    expect(prismaClientConnectSpy).toHaveBeenCalled();
  });
});
