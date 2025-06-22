import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ControlDesembolsoService } from '../services/control-desembolso.service';
import { ControlDesembolso } from '../entities/control-desembolso.entity';

@Controller('control-desembolso')
export class ControlDesembolsoController {
  constructor(private readonly service: ControlDesembolsoService) {}

  @Get()
  findAll(): Promise<ControlDesembolso[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ControlDesembolso> {
    return this.service.findOne(+id);
  }

  @Post()
  create(@Body() dto: Partial<ControlDesembolso>): Promise<ControlDesembolso> {
    return this.service.create(dto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: Partial<ControlDesembolso>,
  ): Promise<ControlDesembolso> {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(+id);
  }
}
