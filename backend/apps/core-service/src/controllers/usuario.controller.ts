import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../entities/usuario.entity';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly service: UsuarioService) {}

  @Get()
  getAll(): Promise<Usuario[]> {
    return this.service.findAll();
  }

  @Get('id/:id')
  getOne(@Param('id') id: number): Promise<Usuario> {
    return this.service.findOne(+id);
  }

  @Get('user/:username')
  getByUser(@Param('username') username: string): Promise<Usuario> {
    return this.service.findByUser(username);
  }

  @Get('email/:email')
  getByEmail(@Param('email') email: string): Promise<Usuario> {
    return this.service.findByEmail(email);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: Partial<Usuario>) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(+id);
  }
}
