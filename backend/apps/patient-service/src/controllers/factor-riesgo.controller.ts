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
import { FactorRiesgoService } from '../services/factor-riesgo.service';
import { FactorRiesgo } from '../entities/factor-riesgo.entity';

@Controller('factor-riesgo')
export class FactorRiesgoController {
  constructor(private readonly factorRiesgoService: FactorRiesgoService) {}

  @Post()
  create(@Body() factorRiesgo: FactorRiesgo) {
    return this.factorRiesgoService.create(factorRiesgo);
  }

  @Get()
  findAll() {
    return this.factorRiesgoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.factorRiesgoService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() factorRiesgo: FactorRiesgo,
  ) {
    return this.factorRiesgoService.update(id, factorRiesgo);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.factorRiesgoService.remove(id);
  }
}
