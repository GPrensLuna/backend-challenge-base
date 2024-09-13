/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable no-console */
import { Injectable, UnauthorizedException } from "@nestjs/common";
import type { CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import type { AuthRequest } from "./interfaces/AuthRequest";
import type { UserDataDto } from "./dto";

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(private readonly jwtService: JwtService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthRequest>();
    console.log(request);
    const authHeader = request.headers["authentication"] as string | undefined;
    console.log("authHeader", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException("Token de autenticación no proporcionado.");
    }

    const token = authHeader.split(" ")[1];
    console.log("authHeader", token);

    try {
      const decodedToken = await this.jwtService.verifyAsync(token);
      request.user = decodedToken as UserDataDto;
      return true;
    } catch {
      throw new UnauthorizedException("Token de autenticación inválido.");
    }
  }
}
