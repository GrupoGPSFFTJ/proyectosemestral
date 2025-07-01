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
import { FactorProtectorService } from '../services/factor-protector.service';
import { FactorProtector } from '../entities/factor-protector.entity';

@Controller('factor-protector')
export class FactorProtectorController {
  constructor(
    private readonly factorProtectorService: FactorProtectorService,
  ) {}

  @Post()
  create(@Body() factorProtector: FactorProtector) {
    return this.factorProtectorService.create(factorProtector);
  }

  @Get()
  findAll() {
    return this.factorProtectorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.factorProtectorService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() factorProtector: FactorProtector,
  ) {
    return this.factorProtectorService.update(id, factorProtector);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.factorProtectorService.remove(id);
  }
}
