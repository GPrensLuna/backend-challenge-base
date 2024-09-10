/* eslint-disable @typescript-eslint/no-unsafe-argument */
import * as request from "supertest";
import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";
import { AppModule } from "../../../app.module";
import type { INestApplication } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { RegisterDto, LoginDto, NotLoginDto, NotLoginEmailDto } from "../../../data";

describe("Login (e2e)", () => {
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

  it("debería hacer login con éxito", async () => {
    await request(app.getHttpServer()).post("/user").send(RegisterDto).expect(201);

    await request(app.getHttpServer()).post("/auth/login").send(LoginDto).expect(200);
  });

  it("debería rechazar el login con un email no válido", async () => {
    await request(app.getHttpServer()).post("/auth/login").send(NotLoginEmailDto).expect(400);
  });

  it("debería rechazar el login si el email no existe", async () => {
    await request(app.getHttpServer()).post("/auth/login").send(NotLoginDto).expect(401);
  });
});
