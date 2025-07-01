import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from '../entities/rol.entity';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Rol)
    private readonly repo: Repository<Rol>,
  ) {}

  findAll(): Promise<Rol[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Rol> {
    const r = await this.repo.findOneBy({ id_rol: id });
    if (!r) throw new NotFoundException(`Rol ${id} no encontrado`);
    return r;
  }
}
