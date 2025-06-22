import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly repo: Repository<Usuario>,
  ) {
  }

  findAll(): Promise<Usuario[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Usuario> {
    const u = await this.repo.findOneBy({ id_usuario: id });
    if (!u) throw new NotFoundException(`Usuario ${id} no encontrado`);
    return u;
  }

  async findByUser(username: string): Promise<Usuario> {
    const u = await this.repo.findOneBy({ username: username });
    if (!u) throw new NotFoundException(`Username ${username} no encontrado`);
    return u;
  }

  async findByEmail(email: string): Promise<Usuario> {
    const u = await this.repo.findOneBy({ email: email });
    if (!u) throw new NotFoundException(`Correo ${email} no encontrado`);
    return u;
  }

  async update(id: number, dto: Partial<Usuario>) {
    await this.findOne(id);
    return this.repo.update(id, dto);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.repo.delete(id);
  }
}
