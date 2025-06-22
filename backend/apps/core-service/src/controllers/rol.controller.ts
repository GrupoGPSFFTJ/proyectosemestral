import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { RolService } from '../services/rol.service';
import { Rol } from '../entities/rol.entity';
import { JwtAuthGuard } from '@app/auth';

@Controller('roles')
export class RolController {
  constructor(private readonly service: RolService) {
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAll(): Promise<Rol[]> {
    return this.service.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number): Promise<Rol> {
    return this.service.findOne(+id);
  }
}
