import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { OdontogramaService } from '../services/odontograma.service';
import { Odontograma } from '../entities/odontograma.entity';

@Controller('odontograma')
export class OdontogramaController {
  constructor(private readonly service: OdontogramaService) {
  }

  @Get()
  findAll(): Promise<Odontograma[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Odontograma> {
    return this.service.findOne(+id);
  }

  @Post()
  create(@Body() dto: Partial<Odontograma>): Promise<Odontograma> {
    return this.service.create(dto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: Partial<Odontograma>,
  ): Promise<Odontograma> {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(+id);
  }
}
