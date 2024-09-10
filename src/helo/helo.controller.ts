import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HeloService } from './helo.service';
import { CreateHeloDto } from './dto/create-helo.dto';
import { UpdateHeloDto } from './dto/update-helo.dto';

@Controller('helo')
export class HeloController {
  constructor(private readonly heloService: HeloService) {}

  @Post()
  create(@Body() createHeloDto: CreateHeloDto) {
    return this.heloService.create(createHeloDto);
  }

  @Get()
  findAll() {
    return this.heloService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.heloService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHeloDto: UpdateHeloDto) {
    return this.heloService.update(+id, updateHeloDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.heloService.remove(+id);
  }
}
