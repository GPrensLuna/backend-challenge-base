import { Injectable } from '@nestjs/common';
import { CreateHeloDto } from './dto/create-helo.dto';
import { UpdateHeloDto } from './dto/update-helo.dto';

@Injectable()
export class HeloService {
  create(createHeloDto: CreateHeloDto) {
    return 'This action adds a new helo';
  }

  findAll() {
    return `This action returns all helo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} helo`;
  }

  update(id: number, updateHeloDto: UpdateHeloDto) {
    return `This action updates a #${id} helo`;
  }

  remove(id: number) {
    return `This action removes a #${id} helo`;
  }
}
