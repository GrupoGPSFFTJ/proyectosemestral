import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { FamiliaService } from '../services/familia.service';
import { Familia } from '../entities/familia.entity';

@Controller('familia')
export class FamiliaController {
  constructor(private readonly familiaService: FamiliaService) {}

  @Post()
  create(@Body() familia: Familia) {
    return this.familiaService.create(familia);
  }

  @Get()
  findAll() {
    return this.familiaService.findAll();
  }

  @Get('count')
  count() {
    return this.familiaService.count();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.familiaService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() familia: Familia) {
    return this.familiaService.update(id, familia);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.familiaService.remove(id);
  }
}
