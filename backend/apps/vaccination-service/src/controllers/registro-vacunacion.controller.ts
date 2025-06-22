import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RegistroVacunacionService } from '../services/registro-vacunacion.service';
import { RegistroVacunacion } from '../entities/registro-vacunacion.entity';

@Controller('registro-vacunacion')
export class RegistroVacunacionController {
  constructor(private readonly service: RegistroVacunacionService) {}

  @Get()
  findAll(): Promise<RegistroVacunacion[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<RegistroVacunacion> {
    return this.service.findOne(+id);
  }

  @Post()
  create(
    @Body() dto: Partial<RegistroVacunacion>,
  ): Promise<RegistroVacunacion> {
    return this.service.create(dto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: Partial<RegistroVacunacion>,
  ): Promise<RegistroVacunacion> {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(+id);
  }
}
