import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FichaOdontologicaService } from '../services/ficha-odontologica.service';
import { FichaOdontologica } from '../entities/ficha-odontologica.entity';

@Controller('ficha-odontologica')
export class FichaOdontologicaController {
  constructor(private readonly service: FichaOdontologicaService) {}

  @Get()
  findAll(): Promise<FichaOdontologica[]> {
    return this.service.findAll();
  }

  @Get('count')
  count() {
    return this.service.count();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<FichaOdontologica> {
    return this.service.findOne(+id);
  }

  @Post()
  create(@Body() dto: Partial<FichaOdontologica>): Promise<FichaOdontologica> {
    return this.service.create(dto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: Partial<FichaOdontologica>,
  ): Promise<FichaOdontologica> {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(+id);
  }
}
