import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProgramaSaludOralService } from '../services/programa-salud-oral.service';
import { ProgramaSaludOral } from '../entities/programa-salud-oral.entity';

@Controller('programa-salud-oral')
export class ProgramaSaludOralController {
  constructor(private readonly service: ProgramaSaludOralService) {
  }

  @Get()
  findAll(): Promise<ProgramaSaludOral[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ProgramaSaludOral> {
    return this.service.findOne(+id);
  }

  @Post()
  create(@Body() dto: Partial<ProgramaSaludOral>): Promise<ProgramaSaludOral> {
    return this.service.create(dto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: Partial<ProgramaSaludOral>,
  ): Promise<ProgramaSaludOral> {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(+id);
  }
}
