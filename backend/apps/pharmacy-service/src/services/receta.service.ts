import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Receta } from '../entities/receta.entity';

@Injectable()
export class RecetaService {
  constructor(
    @InjectRepository(Receta)
    private repo: Repository<Receta>,
  ) {
  }

  create(data: Partial<Receta>): Promise<Receta> {
    const ent = this.repo.create(data);
    return this.repo.save(ent);
  }

  findAll(): Promise<Receta[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Receta> {
    const item = await this.repo.findOne({ where: { id_receta: id } });
    if (!item) throw new NotFoundException(`Receta ${id} no encontrada`);
    return item;
  }

  async update(id: number, data: Partial<Receta>): Promise<Receta> {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const res = await this.repo.delete(id);
    if (res.affected === 0)
      throw new NotFoundException(`Receta ${id} no encontrada`);
  }

  async count(): Promise<number> {
    return this.repo.count();
  }
}
