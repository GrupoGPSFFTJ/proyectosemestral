import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { MiembroFamiliarService } from '../services/miembro-familiar.service';
import { MiembroFamiliar } from '../entities/miembro-familiar.entity';

@Controller('miembro-familiar')
export class MiembroFamiliarController {
  constructor(
    private readonly miembroFamiliarService: MiembroFamiliarService,
  ) {
  }

  @Post()
  create(@Body() miembroFamiliar: MiembroFamiliar) {
    return this.miembroFamiliarService.create(miembroFamiliar);
  }

  @Get()
  findAll() {
    return this.miembroFamiliarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.miembroFamiliarService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() miembroFamiliar: MiembroFamiliar,
  ) {
    return this.miembroFamiliarService.update(id, miembroFamiliar);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.miembroFamiliarService.remove(id);
  }
}
