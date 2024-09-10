import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  Get,
  Param,
  Patch,
  Delete,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiBody, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { UserResponseDto } from "../auth/dto";
import { CreateUserDto, UpdateUserDto } from "./dto";
import type { User } from "@prisma/client";

@ApiTags("User")
@Controller("user")
export class UserController {
  public constructor(private readonly userService: UserService) {}

  //******************************************************************* */
  // TODO: Create
  @Post()
  @ApiOperation({
    summary: "Registro de usuario",
    description: "Este endpoint permite registrar un nuevo usuario.",
  })
  @ApiResponse({
    status: 201,
    description: "Usuario registrado con éxito.",
    type: UserResponseDto,
  })
  @ApiResponse({ status: 400, description: "Datos inválidos." })
  @ApiResponse({ status: 409, description: "Conflicto: el usuario ya existe." })
  @ApiBody({
    type: CreateUserDto,
    description: "Datos necesarios para registrar un usuario",
  })
  @HttpCode(HttpStatus.CREATED)
  public create(@Body() createUserDto: CreateUserDto): Promise<{ message: string }> {
    return this.userService.create(createUserDto);
  }

  //******************************************************************* */
  // TODO: user ID
  @Get(":id")
  @ApiOperation({
    summary: "Obtener usuario por ID",
    description: "Este endpoint permite obtener un usuario existente mediante su ID.",
  })
  @ApiResponse({
    status: 200,
    description: "Usuario encontrado con éxito.",
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: "Usuario no encontrado." })
  public findOne(@Param("id") id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  //******************************************************************* */
  // TODO: all user
  @Get()
  @ApiOperation({
    summary: "Obtener todos los usuarios",
    description: "Este endpoint permite obtener una lista de todos los usuarios.",
  })
  @ApiResponse({
    status: 200,
    description: "Lista de usuarios.",
    type: [UserResponseDto],
  })
  public findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  //******************************************************************* */
  // TODO: UpDateUser ID
  @Patch(":id")
  @ApiOperation({
    summary: "Actualizar usuario por ID",
    description:
      "Este endpoint permite actualizar los datos de un usuario existente mediante su ID.",
  })
  @ApiResponse({
    status: 200,
    description: "Usuario actualizado con éxito.",
    type: UserResponseDto,
  })
  @ApiResponse({ status: 400, description: "Datos inválidos." })
  @ApiResponse({ status: 404, description: "Usuario no encontrado." })
  @ApiBody({
    type: UpdateUserDto,
    description: "Datos necesarios para actualizar un usuario",
  })
  public update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  //******************************************************************* */
  // TODO: Delete logical user ID
  @Delete(":id")
  @ApiOperation({
    summary: "Eliminar usuario por ID",
    description: "Este endpoint permite eliminar un usuario existente mediante su ID.",
  })
  @ApiResponse({
    status: 200,
    description: "Usuario eliminado con éxito.",
  })
  @ApiResponse({ status: 404, description: "Usuario no encontrado." })
  public remove(@Param("id") id: string): Promise<{ message: string }> {
    return this.userService.remove(id);
  }
}
