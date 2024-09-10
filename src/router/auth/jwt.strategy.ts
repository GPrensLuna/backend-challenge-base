import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import type { CustomRequest, JwtPayload } from "./interfaces/jwt-payload.interface";

const extractJwtFromCookie = (req: CustomRequest): string => req.cookies["Authentication"];

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([extractJwtFromCookie]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY ?? "developer",
    });
  }

  public validate(payload: JwtPayload): { userId: string; username: string } {
    return { userId: payload.sub, username: payload.username };
  }
}
