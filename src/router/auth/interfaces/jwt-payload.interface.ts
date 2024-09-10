import type { Request } from "express";

export interface JwtPayload {
  username: string;
  sub: string;
}

export interface CustomRequest extends Request {
  cookies: Record<string, string>;
}
