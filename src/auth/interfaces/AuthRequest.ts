import type { Request } from "express";
import type { UserDataDto } from "../dto";

export interface AuthRequest extends Request {
  user: Promise<UserDataDto>;
}
