import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { EstratificacionRiesgoService } from '../services/estratificacion-riesgo.service';
import { EstratificacionRiesgo } from '../entities/estratificacion-riesgo.entity';

@Controller('estratificacion-riesgo')
export class EstratificacionRiesgoController {
  constructor(private readonly svc: EstratificacionRiesgoService) {
  }

  @Post()
  create(
    @Body() data: Partial<EstratificacionRiesgo>,
  ): Promise<EstratificacionRiesgo> {
    return this.svc.create(data);
  }

  @Get()
  findAll(): Promise<EstratificacionRiesgo[]> {
    return this.svc.findAll();
  }

  @Get('count')
  count() {
    return this.svc.count();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<EstratificacionRiesgo> {
    return this.svc.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<EstratificacionRiesgo>,
  ): Promise<EstratificacionRiesgo> {
    return this.svc.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.svc.remove(id);
  }
}
