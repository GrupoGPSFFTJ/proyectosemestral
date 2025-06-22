import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RecetaService } from '../services/receta.service';
import { Receta } from '../entities/receta.entity';

@Controller('receta')
export class RecetaController {
  constructor(private readonly service: RecetaService) {
  }

  @Get()
  findAll(): Promise<Receta[]> {
    return this.service.findAll();
  }

  @Get('count')
  count() {
    return this.service.count();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Receta> {
    return this.service.findOne(+id);
  }

  @Post()
  create(@Body() dto: Partial<Receta>): Promise<Receta> {
    return this.service.create(dto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: Partial<Receta>,
  ): Promise<Receta> {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(+id);
  }
}
