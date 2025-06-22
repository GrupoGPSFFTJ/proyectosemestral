import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProgramaNutricionalService } from '../services/programa-nutricional.service';
import { ProgramaNutricional } from '../entities/programa-nutricional.entity';

@Controller('programa-nutricional')
export class ProgramaNutricionalController {
  constructor(private readonly service: ProgramaNutricionalService) {}

  @Get()
  findAll(): Promise<ProgramaNutricional[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ProgramaNutricional> {
    return this.service.findOne(+id);
  }

  @Post()
  create(
    @Body() dto: Partial<ProgramaNutricional>,
  ): Promise<ProgramaNutricional> {
    return this.service.create(dto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: Partial<ProgramaNutricional>,
  ): Promise<ProgramaNutricional> {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(+id);
  }
}
