/* eslint-disable @typescript-eslint/no-unsafe-argument */
import * as request from "supertest";
import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";
import { AppModule } from "../../app.module";
import type { INestApplication } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { InvalidEmailDto, LoginDto, Passwords, RegisterDto } from "../../data";

describe("Create (e2e)", () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [PrismaService],
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

  it("debería validar que el email sea de tipo email", async () => {
    await request(app.getHttpServer()).post("/user").send(InvalidEmailDto).expect(400);

    await request(app.getHttpServer()).post("/user").send(RegisterDto).expect(201);
  });

  it("debería validar que el email no esté repetido", async () => {
    await request(app.getHttpServer()).post("/user").send(RegisterDto).expect(201);

    await request(app.getHttpServer()).post("/user").send(RegisterDto).expect(409);
  });

  it("debería validar la contraseña $password", async () => {
    for (const password of Passwords) {
      await request(app.getHttpServer())
        .post("/user")
        .send({ ...RegisterDto, password })
        .expect(409);
    }
  });

  it("debería registrar un nuevo usuario exitosamente", async () => {
    await request(app.getHttpServer()).post("/user").send(RegisterDto).expect(201);
  });
  it("should return a user by ID", async () => {
    await request(app.getHttpServer()).post("/user").send(RegisterDto).expect(201);

    await request(app.getHttpServer()).post("/auth/login").send(LoginDto);
    const user = await request(app.getHttpServer()).get("/user");

    const userId = user.body[0].id;

    const response = await request(app.getHttpServer()).get(`/user/${userId}`).expect(200);

    expect(response.body).toHaveProperty("id", userId);
  });

  it("should return 404 if user is not found", async () => {
    await request(app.getHttpServer()).get("/user/non-existing-id").expect(404);
  });

  it("should return a all user", async () => {
    await request(app.getHttpServer()).post("/user").send(RegisterDto).expect(201);

    const user = await request(app.getHttpServer()).get("/user");
    expect(user.status).toBe(200);
    expect([]);
  });

  it("should delete an existing user successfully", async () => {
    await request(app.getHttpServer()).post("/user").send(RegisterDto).expect(201);

    await request(app.getHttpServer()).post("/auth/login").send(LoginDto);
    const user = await request(app.getHttpServer()).get("/user");

    const userId = user.body[0].id;

    const deleteUser = await request(app.getHttpServer())
      .delete(`/user/${userId}`)
      .send(RegisterDto)
      .expect(200);
    expect(deleteUser.body).toEqual({ message: "Usuario eliminado con éxito." });
  });
});
