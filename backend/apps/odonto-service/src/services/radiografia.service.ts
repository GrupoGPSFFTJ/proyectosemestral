import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Radiografia } from '../entities/radiografia.entity';

@Injectable()
export class RadiografiaService {
  constructor(
    @InjectRepository(Radiografia)
    private readonly repo: Repository<Radiografia>,
  ) {}

  create(data: Partial<Radiografia>): Promise<Radiografia> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  findAll(): Promise<Radiografia[]> {
    return this.repo.find({ order: { id_radiografia: 'ASC' } });
  }

  async findOne(id: number): Promise<Radiografia> {
    const item = await this.repo.findOne({ where: { id_radiografia: id } });
    if (!item) throw new NotFoundException(`Radiografia ${id} no encontrada`);
    return item;
  }

  async update(id: number, data: Partial<Radiografia>): Promise<Radiografia> {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
    return entity;
  }
}
