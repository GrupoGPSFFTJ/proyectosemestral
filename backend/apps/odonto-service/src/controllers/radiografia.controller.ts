import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RadiografiaService } from '../services/radiografia.service';
import { Radiografia } from '../entities/radiografia.entity';

@Controller('radiografia')
export class RadiografiaController {
  constructor(private readonly service: RadiografiaService) {}

  @Get()
  findAll(): Promise<Radiografia[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Radiografia> {
    return this.service.findOne(+id);
  }

  @Post()
  create(@Body() dto: Partial<Radiografia>): Promise<Radiografia> {
    return this.service.create(dto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: Partial<Radiografia>,
  ): Promise<Radiografia> {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(+id);
  }
}
