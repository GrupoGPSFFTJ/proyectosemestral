import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MedicamentoService } from '../services/medicamento.service';
import { Medicamento } from '../entities/medicamento.entity';

@Controller('medicamento')
export class MedicamentoController {
  constructor(private readonly service: MedicamentoService) {}

  @Get()
  findAll(): Promise<Medicamento[]> {
    return this.service.findAll();
  }

  @Get('count')
  count() {
    return this.service.count();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Medicamento> {
    return this.service.findOne(+id);
  }

  @Post()
  create(@Body() dto: Partial<Medicamento>): Promise<Medicamento> {
    return this.service.create(dto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: Partial<Medicamento>,
  ): Promise<Medicamento> {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(+id);
  }
}
