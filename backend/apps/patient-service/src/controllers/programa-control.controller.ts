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
import { ProgramaControlService } from '../services/programa-control.service';
import { ProgramaControl } from '../entities/programa-control.entity';

@Controller('programa-control')
export class ProgramaControlController {
  constructor(
    private readonly programaControlService: ProgramaControlService,
  ) {}

  @Post()
  create(@Body() programaControl: ProgramaControl) {
    return this.programaControlService.create(programaControl);
  }

  @Get()
  findAll() {
    return this.programaControlService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.programaControlService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() programaControl: ProgramaControl,
  ) {
    return this.programaControlService.update(id, programaControl);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.programaControlService.remove(id);
  }
}
