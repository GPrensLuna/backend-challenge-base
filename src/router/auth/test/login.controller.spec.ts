/* eslint-disable @typescript-eslint/no-unsafe-argument */
import * as request from "supertest";
import type { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";
import { AppModule } from "../../../app.module";
import { PrismaService } from "../../../prisma/prisma.service";
import { RegisterDto, LoginDto, NotLoginDto } from "../../../data";

describe("POST /auth/login (e2e)", () => {
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

  it("should login successfully and set a cookie", async () => {
    await request(app.getHttpServer()).post("/user").send(RegisterDto).expect(201);

    const response = await request(app.getHttpServer())
      .post("/auth/login")
      .send(LoginDto)
      .expect(200);

    expect(response.body.message).toBe("Login exitoso");
    expect(response.headers["set-cookie"]).toBeDefined();
  });

  it("should return 401 if credentials are invalid", async () => {
    const response = await request(app.getHttpServer())
      .post("/auth/login")
      .send(NotLoginDto)
      .expect(401);

    expect(response.body.message).toBe("Credenciales incorrectas.");
  });
});
