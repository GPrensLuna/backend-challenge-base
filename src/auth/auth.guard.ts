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

    const authHeader = request.headers["authentication"] as string | undefined;

    if (!authHeader) {
      this.logger.warn("Authorization header missing");
      throw new UnauthorizedException("Token de autenticación no proporcionado.");
    }

    if (!authHeader.startsWith("Bearer ")) {
      this.logger.warn("Invalid authorization header format");
      throw new UnauthorizedException("Token de autenticación no proporcionado.");
    }

    const token = authHeader.split(" ")[1];

    try {
      const decodedToken = await this.jwtService.verifyAsync(token);
      request.user = decodedToken as UserDataDto;
      this.logger.log("Token successfully verified");
      return true;
    } catch (error) {
      this.logger.error("Token verification failed", error);
      throw new UnauthorizedException("Token de autenticación inválido.");
    }
  }
}
