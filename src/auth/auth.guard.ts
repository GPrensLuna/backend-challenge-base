/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable no-console */
import { Injectable, UnauthorizedException, Logger } from "@nestjs/common";
import type { CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import type { AuthRequest } from "./interfaces/AuthRequest";
import type { UserDataDto } from "./dto";

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  public constructor(private readonly jwtService: JwtService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthRequest>();
    console.log(`request ${request}`);

    const authHeader = request.headers["Authentication"] as string | undefined;
    console.log(`authHeader ${authHeader}`);
    if (!authHeader) {
      console.log(`authHeader ${authHeader}`);

      throw new UnauthorizedException("Token de autenticación no proporcionado.");
    }

    if (!authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException("Token de autenticación no proporcionado.");
    }

    const token = authHeader.split(" ")[1];

    try {
      const decodedToken = await this.jwtService.verifyAsync(token);
      request.user = decodedToken as UserDataDto;
      return true;
    } catch (error) {
      console.log(`error ${error}`);

      throw new UnauthorizedException("Token de autenticación inválido.");
    }
  }
}
