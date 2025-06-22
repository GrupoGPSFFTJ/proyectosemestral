import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { InscripcionPacamService } from '../services/inscripcion-pacam.service';
import { InscripcionPacam } from '../entities/inscripcion-pacam.entity';

@Controller('inscripcion-pacam')
export class InscripcionPacamController {
  constructor(private readonly service: InscripcionPacamService) {}

  @Get()
  findAll(): Promise<InscripcionPacam[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<InscripcionPacam> {
    return this.service.findOne(+id);
  }

  @Post()
  create(@Body() dto: Partial<InscripcionPacam>): Promise<InscripcionPacam> {
    return this.service.create(dto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: Partial<InscripcionPacam>,
  ): Promise<InscripcionPacam> {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(+id);
  }
}
