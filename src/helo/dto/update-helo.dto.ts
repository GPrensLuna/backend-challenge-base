import { PartialType } from '@nestjs/swagger';
import { CreateHeloDto } from './create-helo.dto';

export class UpdateHeloDto extends PartialType(CreateHeloDto) {}
