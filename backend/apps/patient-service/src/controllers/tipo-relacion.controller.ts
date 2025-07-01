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
import { TipoRelacionService } from '../services/tipo-relacion.service';
import { TipoRelacion } from '../entities/tipo-relacion.entity';

@Controller('tipo-relacion')
export class TipoRelacionController {
  constructor(private readonly tipoRelacionService: TipoRelacionService) {}

  @Post()
  create(@Body() tipoRelacion: TipoRelacion) {
    return this.tipoRelacionService.create(tipoRelacion);
  }

  @Get()
  findAll() {
    return this.tipoRelacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tipoRelacionService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() tipoRelacion: TipoRelacion,
  ) {
    return this.tipoRelacionService.update(id, tipoRelacion);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tipoRelacionService.remove(id);
  }
}
