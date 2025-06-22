import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsuarioRolService } from '../services/usuario-rol.service';
import { UsuarioRol } from '../entities/usuario-rol.entity';

@Controller('usuario-rol')
export class UsuarioRolController {
  constructor(private readonly service: UsuarioRolService) {
  }

  @Get()
  getAll(): Promise<UsuarioRol[]> {
    return this.service.findAll();
  }

  @Get(':id_usuario/:id_rol')
  getOne(
    @Param('id_usuario') id_usuario: number,
    @Param('id_rol') id_rol: number,
  ): Promise<UsuarioRol> {
    return this.service.findOne(+id_usuario, +id_rol);
  }

  @Post()
  create(@Body() dto: Partial<UsuarioRol>): Promise<UsuarioRol> {
    return this.service.create(dto);
  }

  @Put(':id_usuario/:id_rol')
  update(
    @Param('id_usuario') id_usuario: number,
    @Param('id_rol') id_rol: number,
    @Body() dto: Partial<UsuarioRol>,
  ) {
    return this.service.update(+id_usuario, +id_rol, dto);
  }

  @Delete(':id_usuario/:id_rol')
  remove(
    @Param('id_usuario') id_usuario: number,
    @Param('id_rol') id_rol: number,
  ) {
    return this.service.remove(+id_usuario, +id_rol);
  }
}
