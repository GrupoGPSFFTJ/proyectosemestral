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
import { FichaControlService } from '../services/ficha-control.service';
import { FichaControl } from '../entities/ficha-control.entity';

@Controller('ficha-control')
export class FichaControlController {
  constructor(private readonly fichaControlService: FichaControlService) {}

  @Post()
  create(@Body() fichaControl: FichaControl) {
    return this.fichaControlService.create(fichaControl);
  }

  @Get()
  findAll() {
    return this.fichaControlService.findAll();
  }

  @Get('count')
  count() {
    return this.fichaControlService.count();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.fichaControlService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() fichaControl: FichaControl,
  ) {
    return this.fichaControlService.update(id, fichaControl);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.fichaControlService.remove(id);
  }
}
