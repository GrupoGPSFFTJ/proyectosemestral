import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { InformePacamService } from '../services/informe-pacam.service';
import { InformePacam } from '../entities/informe-pacam.entity';

@Controller('informe-pacam')
export class InformePacamController {
  constructor(private readonly service: InformePacamService) {}

  @Get()
  findAll(): Promise<InformePacam[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<InformePacam> {
    return this.service.findOne(+id);
  }

  @Post()
  create(@Body() dto: Partial<InformePacam>): Promise<InformePacam> {
    return this.service.create(dto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: Partial<InformePacam>,
  ): Promise<InformePacam> {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(+id);
  }
}
