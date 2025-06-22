import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { PlanIntervencionService } from '../services/plan-intervencion.service';
import { PlanIntervencion } from '../entities/plan-intervencion.entity';

@Controller('plan-intervencion')
export class PlanIntervencionController {
  constructor(
    private readonly planIntervencionService: PlanIntervencionService,
  ) {
  }

  @Post()
  create(@Body() planIntervencion: PlanIntervencion) {
    return this.planIntervencionService.create(planIntervencion);
  }

  @Get()
  findAll() {
    return this.planIntervencionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.planIntervencionService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() planIntervencion: PlanIntervencion,
  ) {
    return this.planIntervencionService.update(id, planIntervencion);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.planIntervencionService.remove(id);
  }
}
