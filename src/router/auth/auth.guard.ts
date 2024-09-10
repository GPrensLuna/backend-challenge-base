/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable, UnauthorizedException } from "@nestjs/common";
import type { CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(private readonly jwtService: JwtService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.cookies["Authentication"];

    if (!authHeader) {
      throw new UnauthorizedException("Token de autenticación no proporcionado.");
    }

    try {
      const payload = await this.jwtService.verifyAsync(authHeader);
      request.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException("Token de autenticación inválido.");
    }
  }
}
