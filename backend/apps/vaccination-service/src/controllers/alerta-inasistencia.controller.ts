import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AlertaInasistenciaService } from '../services/alerta-inasistencia.service';
import { AlertaInasistencia } from '../entities/alerta-inasistencia.entity';

@Controller('alerta-inasistencia')
export class AlertaInasistenciaController {
  constructor(private readonly service: AlertaInasistenciaService) {}

  @Get()
  findAll(): Promise<AlertaInasistencia[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<AlertaInasistencia> {
    return this.service.findOne(+id);
  }

  @Post()
  create(
    @Body() dto: Partial<AlertaInasistencia>,
  ): Promise<AlertaInasistencia> {
    return this.service.create(dto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: Partial<AlertaInasistencia>,
  ): Promise<AlertaInasistencia> {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(+id);
  }
}
