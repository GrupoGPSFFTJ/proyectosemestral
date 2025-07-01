import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { PacienteService } from '../services/paciente.service';
import { Paciente } from '../entities/paciente.entity';

@Controller('paciente')
export class PacienteController {
  constructor(private readonly pacienteService: PacienteService) {}

  @Post()
  create(@Body() paciente: Paciente) {
    return this.pacienteService.create(paciente);
  }

  @Get()
  findAll() {
    return this.pacienteService.findAll();
  }

  @Get('count')
  count() {
    return this.pacienteService.count();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pacienteService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() paciente: Paciente) {
    return this.pacienteService.update(id, paciente);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pacienteService.remove(id);
  }
}
