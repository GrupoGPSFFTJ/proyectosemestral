import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { HistorialResultadoService } from '../services/historial-resultado.service';
import { HistorialResultado } from '../entities/historial-resultado.entity';

@Controller('historial-resultado')
export class HistorialResultadoController {
  constructor(
    private readonly historialResultadoService: HistorialResultadoService,
  ) {
  }

  @Post()
  create(@Body() historialResultado: HistorialResultado) {
    return this.historialResultadoService.create(historialResultado);
  }

  @Get()
  findAll() {
    return this.historialResultadoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.historialResultadoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() historialResultado: HistorialResultado,
  ) {
    return this.historialResultadoService.update(id, historialResultado);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.historialResultadoService.remove(id);
  }
}
