/* eslint-disable @typescript-eslint/no-unsafe-argument */
import * as request from "supertest";
import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";
import { AppModule } from "../../app.module";
import type { INestApplication } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { RegisterDto, Movie } from "../../data";

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
    const favorite = await prismaService.favorite.findUnique({
      where: { movieId: Movie.id },
    });

    if (favorite) {
      await prismaService.favorite.delete({
        where: { movieId: Movie.id },
      });
    }
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
    const favorite = await prismaService.favorite.findUnique({
      where: { movieId: Movie.id },
    });

    if (favorite) {
      await prismaService.favorite.delete({
        where: { movieId: Movie.id },
      });
      const user = await prismaService.user.findUnique({
        where: { email: RegisterDto.email },
      });

      if (user) {
        await prismaService.user.delete({
          where: { email: RegisterDto.email },
        });
      }
    }
    await prismaService.$disconnect();
    await app.close();
  });

  it("debería agregar una película a favoritos", async () => {
    await request(app.getHttpServer()).post("/user").send(RegisterDto).expect(201);
    const user = await request(app.getHttpServer()).get("/user");
    const userId = user.body[0].id;
    await request(app.getHttpServer())
      .post(`/favorites`)
      .send({ userId, movieId: Movie.id, title: Movie.name })
      .expect(201);
  });
  it("debería devolverme un array de película en favoritos del usuario", async () => {
    await request(app.getHttpServer()).post("/user").send(RegisterDto).expect(201);
    const user = await request(app.getHttpServer()).get("/user");
    const userId = user.body[0].id;
    await request(app.getHttpServer()).get(`/favorites`).send({ userId }).expect(200).expect([]);
  });
  it("debería eliminar una de las película en favoritos del usuario ", async () => {
    await request(app.getHttpServer()).post("/user").send(RegisterDto).expect(201);
    const user = await request(app.getHttpServer()).get("/user");
    const userId = user.body[0].id;
    await request(app.getHttpServer())
      .post(`/favorites`)
      .send({ userId, movieId: Movie.id, title: Movie.name })
      .expect(201);
    await request(app.getHttpServer())
      .delete(`/favorites`)
      .send({ userId, movieId: Movie.id })
      .expect(200);
  });
});
