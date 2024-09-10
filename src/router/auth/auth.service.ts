import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import * as validator from "validator";
import { PrismaService } from "../../prisma/prisma.service";
import type * as typeValidate from "./dto";

@Injectable()
export class AuthService {
  public constructor(
    private readonly db: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(loginDto: typeValidate.LoginDto): Promise<typeValidate.UserResponseDto> {
    this.validateEmail(loginDto.email);

    const user = await this.db.user.findUnique({
      where: { email: loginDto.email },
      select: { password: true, id: true, username: true, email: true },
    });

    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException("Credenciales incorrectas.");
    }

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      message: "Login exitoso",
    };
  }

  private validateEmail(email: string): void {
    if (!validator.isEmail(email)) {
      throw new BadRequestException("El email proporcionado no es válido.");
    }
  }
}
