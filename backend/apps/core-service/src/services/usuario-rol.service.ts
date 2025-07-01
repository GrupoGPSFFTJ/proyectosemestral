import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioRol } from '../entities/usuario-rol.entity';

@Injectable()
export class UsuarioRolService {
  constructor(
    @InjectRepository(UsuarioRol)
    private readonly repo: Repository<UsuarioRol>,
  ) {}

  findAll(): Promise<UsuarioRol[]> {
    return this.repo.find();
  }

  async findOne(id_usuario: number, id_rol: number): Promise<UsuarioRol> {
    const ur = await this.repo.findOneBy({ id_usuario, id_rol });
    if (!ur)
      throw new NotFoundException(
        `Asignación ${id_usuario}-${id_rol} no encontrada`,
      );
    return ur;
  }

  create(dto: Partial<UsuarioRol>): Promise<UsuarioRol> {
    return this.repo.save(this.repo.create(dto));
  }

  async update(id_usuario: number, id_rol: number, dto: Partial<UsuarioRol>) {
    await this.findOne(id_usuario, id_rol);
    // para clave compuesta: eliminar y volver a crear
    await this.repo.delete({ id_usuario, id_rol });
    return this.repo.save(this.repo.create(dto));
  }

  async remove(id_usuario: number, id_rol: number) {
    await this.findOne(id_usuario, id_rol);
    return this.repo.delete({ id_usuario, id_rol });
  }
}
