import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DespachoMedicamentoService } from '../services/despacho-medicamento.service';
import { DespachoMedicamento } from '../entities/despacho-medicamento.entity';

@Controller('despacho-medicamento')
export class DespachoMedicamentoController {
  constructor(private readonly service: DespachoMedicamentoService) {}

  @Get()
  findAll(): Promise<DespachoMedicamento[]> {
    return this.service.findAll();
  }

  @Get('count')
  count() {
    return this.service.count();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<DespachoMedicamento> {
    return this.service.findOne(+id);
  }

  @Post()
  create(
    @Body() dto: Partial<DespachoMedicamento>,
  ): Promise<DespachoMedicamento> {
    return this.service.create(dto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: Partial<DespachoMedicamento>,
  ): Promise<DespachoMedicamento> {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(+id);
  }
}
