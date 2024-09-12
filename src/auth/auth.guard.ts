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

    const authHeader = request.headers["authentication"] as string | undefined;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException("Token de autenticación no proporcionado.");
    }

    const token = authHeader.split(" ")[1];

    try {
      const decodedToken = await this.jwtService.verifyAsync(token);
      request.user = decodedToken as UserDataDto;
      return true;
    } catch {
      throw new UnauthorizedException("Token de autenticación inválido.");
    }
  }
}
