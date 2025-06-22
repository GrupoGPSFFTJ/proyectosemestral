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
import { RecetaMedicamentoService } from '../services/receta-medicamento.service';
import { RecetaMedicamento } from '../entities/receta-medicamento.entity';

@Controller('receta-medicamento')
export class RecetaMedicamentoController {
  constructor(private readonly service: RecetaMedicamentoService) {}

  @Get()
  findAll(): Promise<RecetaMedicamento[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<RecetaMedicamento> {
    return this.service.findOne(+id);
  }

  @Get('receta/:id')
  findByReceta(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RecetaMedicamento> {
    return this.service.findByReceta(id);
  }

  @Post()
  create(@Body() dto: Partial<RecetaMedicamento>): Promise<RecetaMedicamento> {
    return this.service.create(dto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: Partial<RecetaMedicamento>,
  ): Promise<RecetaMedicamento> {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(+id);
  }
}
