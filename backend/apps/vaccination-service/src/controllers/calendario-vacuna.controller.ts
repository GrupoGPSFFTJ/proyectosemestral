import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CalendarioVacunaService } from '../services/calendario-vacuna.service';
import { CalendarioVacuna } from '../entities/calendario-vacuna.entity';

@Controller('calendario-vacuna')
export class CalendarioVacunaController {
  constructor(private readonly service: CalendarioVacunaService) {}

  @Get()
  findAll(): Promise<CalendarioVacuna[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<CalendarioVacuna> {
    return this.service.findOne(+id);
  }

  @Post()
  create(@Body() dto: Partial<CalendarioVacuna>): Promise<CalendarioVacuna> {
    return this.service.create(dto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: Partial<CalendarioVacuna>,
  ): Promise<CalendarioVacuna> {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(+id);
  }
}
