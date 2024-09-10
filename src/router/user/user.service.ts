import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import type { UpdateUserDto } from "./dto/update-user.dto";
import * as validator from "validator";
import type * as typeValidate from "./dto";
import { PrismaService } from "../../prisma/prisma.service";
import * as bcrypt from "bcryptjs";
import type { User } from "@prisma/client";

@Injectable()
export class UserService {
  private readonly passwordValidationRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?.&])[A-Za-z\d@$!%*?.&]{8,}$/;
  public constructor(private readonly db: PrismaService) {}
  public async create(createUserDto: typeValidate.CreateUserDto): Promise<{ message: string }> {
    this.validateEmail(createUserDto.email);
    this.validatePassword(createUserDto.password);

    await this.ensureUniqueUser(createUserDto.email, createUserDto.username);

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    await this.db.user.create({
      data: { ...createUserDto, password: hashedPassword },
    });

    return { message: "Usuario registrado con éxito." };
  }
  private async ensureUniqueUser(email: string, username: string): Promise<void> {
    const userExists = await this.db.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (userExists) {
      if (userExists.email === email) {
        throw new ConflictException("El correo electrónico ya está en uso.");
      }
      if (userExists.username === username) {
        throw new ConflictException("El nombre de usuario ya está en uso.");
      }
    }
  }

  private validateEmail(email: string): void {
    if (!validator.isEmail(email)) {
      throw new BadRequestException("El email proporcionado no es válido.");
    }
  }

  private validatePassword(password: string): void {
    if (!this.passwordValidationRegex.test(password)) {
      throw new ConflictException(
        "La contraseña debe contener al menos una letra, una mayúscula, un número y un símbolo.",
      );
    }
  }
  public findAll(): Promise<User[]> {
    return this.db.user.findMany();
  }

  public async findOne(id: string): Promise<User> {
    const user = await this.db.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException("El usuario no fue encontrado.");
    }
    return user;
  }

  public async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.db.user.update({
      where: { id },
      data: updateUserDto,
    });
    if (!updatedUser as boolean) {
      throw new NotFoundException("El usuario no fue encontrado.");
    }
    return updatedUser;
  }

  public async remove(id: string): Promise<{ message: string }> {
    const user = await this.db.user.update({
      where: { id },
      data: {
        delete: true,
      },
    });
    if (!user as boolean) {
      throw new NotFoundException("El usuario no fue encontrado.");
    }
    return { message: "Usuario eliminado con éxito." };
  }
}
