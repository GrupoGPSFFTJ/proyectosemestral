import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { VacunaService } from '../services/vacuna.service';
import { Vacuna } from '../entities/vacuna.entity';

@Controller('vacuna')
export class VacunaController {
  constructor(private readonly service: VacunaService) {}

  @Get()
  findAll(): Promise<Vacuna[]> {
    return this.service.findAll();
  }

  @Get('count')
  count() {
    return this.service.count();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Vacuna> {
    return this.service.findOne(+id);
  }

  @Post()
  create(@Body() dto: Partial<Vacuna>): Promise<Vacuna> {
    return this.service.create(dto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: Partial<Vacuna>,
  ): Promise<Vacuna> {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(+id);
  }
}
