import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CentroSaludService } from '../services/centro-salud.service';
import { CentroSalud } from '../entities/centro-salud.entity';

@Controller('centros-salud')
export class CentroSaludController {
  constructor(private readonly service: CentroSaludService) {
  }

  @Get()
  getAll(): Promise<CentroSalud[]> {
    return this.service.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number): Promise<CentroSalud> {
    return this.service.findOne(+id);
  }

  @Post()
  create(@Body() dto: Partial<CentroSalud>): Promise<CentroSalud> {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: Partial<CentroSalud>) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(+id);
  }
}
