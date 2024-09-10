import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  UseGuards,
  Request,
  Get,
  Res,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiConsumes,
  ApiProduces,
  ApiCookieAuth,
} from "@nestjs/swagger";
import { Response } from "express";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
import { LoginDto } from "./dto/login.dto";
import * as dtoType from "./dto";
import { AuthRequest } from "./interfaces/AuthRequest";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  //******************************************************************* */
  // TODO: Login
  @Post("login")
  @ApiOperation({
    summary: "Iniciar sesión con credenciales",
    description:
      "Este endpoint permite a los usuarios autenticarse usando su correo electrónico y contraseña.",
  })
  @ApiResponse({
    status: 200,
    description: "Inicio de sesión exitoso.",
    type: dtoType.UserResponseDto,
  })
  @ApiResponse({ status: 401, description: "Credenciales inválidas." })
  @ApiResponse({ status: 400, description: "Datos de entrada inválidos." })
  @ApiBody({ type: LoginDto, description: "Datos necesarios para iniciar sesión" })
  @ApiConsumes("application/json")
  @ApiProduces("application/json")
  @HttpCode(HttpStatus.OK)
  public async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<dtoType.UserResponseDto> {
    const jwt = await this.authService.login(loginDto);

    response.cookie("Authentication", jwt.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return { message: "Login exitoso" };
  }
  //******************************************************************* */

  //******************************************************************* */
  // TODO: Get Profile
  @UseGuards(AuthGuard)
  @Get("profile")
  @ApiOperation({
    summary: "Obtener perfil del usuario",
    description: "Este endpoint permite obtener la información del perfil del usuario autenticado.",
  })
  @ApiResponse({
    status: 200,
    description: "Perfil del usuario recuperado con éxito.",
    type: dtoType.UserDataDto,
  })
  @ApiResponse({ status: 401, description: "No autorizado. Token inválido o no proporcionado." })
  @ApiCookieAuth()
  public async getProfile(@Request() req: AuthRequest): Promise<dtoType.UserDataDto> {
    const session = await req.user;
    return {
      id: session.id,
      email: session.email,
      username: session.username,
    };
  }
  //******************************************************************* */

  //******************************************************************* */
  // TODO: Logout
  @Post("logout")
  @ApiOperation({
    summary: "Cerrar sesión",
    description:
      "Este endpoint permite a los usuarios cerrar sesión y eliminar sus cookies de autenticación.",
  })
  @ApiResponse({
    status: 200,
    description: "Cierre de sesión exitoso.",
  })
  @ApiResponse({
    status: 401,
    description: "No autorizado. Token inválido o no proporcionado.",
  })
  @HttpCode(HttpStatus.OK)
  public logout(@Res({ passthrough: true }) response: Response): { message: string } {
    response.clearCookie("Authentication", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return { message: "Logout exitoso, cookies eliminadas" };
  }
}
//******************************************************************* */
