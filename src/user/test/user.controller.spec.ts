/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";
import type { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { PrismaService } from "../../prisma/prisma.service";
import { AppModule } from "../../app.module";
import { RegisterDto } from "../../data";

describe("POST /user(e2e)", () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prismaService = moduleFixture.get<PrismaService>(PrismaService);
    await app.init();
  });

  beforeEach(async () => {
    const user = await prismaService.user.findUnique({
      where: { email: RegisterDto.email },
    });

    if (user) {
      await prismaService.user.delete({
        where: { email: RegisterDto.email },
      });
    }
  });

  afterAll(async () => {
    const user = await prismaService.user.findUnique({
      where: { email: RegisterDto.email },
    });

    if (user) {
      await prismaService.user.delete({
        where: { email: RegisterDto.email },
      });
    }
    await prismaService.$disconnect();
    await app.close();
  });

  it("should register a user successfully", async () => {
    const response = await request(app.getHttpServer()).post("/user").send(RegisterDto).expect(201);

    expect(response.body.message).toBe("Usuario registrado con éxito.");
  });

  it("should return 409 if email already exists", async () => {
    await request(app.getHttpServer()).post("/user").send(RegisterDto).expect(201);

    const response = await request(app.getHttpServer()).post("/user").send(RegisterDto).expect(409);

    expect(response.body.message).toBe("El correo electrónico ya está en uso.");
  });
});
