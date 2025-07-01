import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CitaService } from '../services/cita.service';
import { Cita } from '../entities/cita.entity';

@Controller('cita')
export class CitaController {
  constructor(private readonly citaService: CitaService) {}

  @Post()
  create(@Body() data: Partial<Cita>): Promise<Cita> {
    return this.citaService.create(data);
  }

  @Get()
  findAll(): Promise<Cita[]> {
    return this.citaService.findAll();
  }

  @Get('count')
  count() {
    return this.citaService.count();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Cita> {
    return this.citaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Cita>,
  ): Promise<Cita> {
    return this.citaService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.citaService.remove(id);
  }
}
