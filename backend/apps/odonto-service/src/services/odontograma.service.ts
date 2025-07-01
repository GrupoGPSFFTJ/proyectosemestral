import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Odontograma } from '../entities/odontograma.entity';

@Injectable()
export class OdontogramaService {
  constructor(
    @InjectRepository(Odontograma)
    private readonly repo: Repository<Odontograma>,
  ) {}

  create(data: Partial<Odontograma>): Promise<Odontograma> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  findAll(): Promise<Odontograma[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Odontograma> {
    const item = await this.repo.findOne({ where: { id_odontograma: id } });
    if (!item) throw new NotFoundException(`Odontograma ${id} no encontrado`);
    return item;
  }

  async update(id: number, data: Partial<Odontograma>): Promise<Odontograma> {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const res = await this.repo.delete(id);
    if (res.affected === 0)
      throw new NotFoundException(`Odontograma ${id} no encontrado`);
  }
}
