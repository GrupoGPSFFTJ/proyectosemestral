import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vacuna } from '../entities/vacuna.entity';

@Injectable()
export class VacunaService {
  constructor(
    @InjectRepository(Vacuna)
    private repo: Repository<Vacuna>,
  ) {}

  create(data: Partial<Vacuna>): Promise<Vacuna> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  findAll(): Promise<Vacuna[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Vacuna> {
    const item = await this.repo.findOne({ where: { id_vacuna: id } });
    if (!item) throw new NotFoundException(`Vacuna ${id} no encontrada`);
    return item;
  }

  async update(id: number, data: Partial<Vacuna>): Promise<Vacuna> {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const res = await this.repo.delete(id);
    if (res.affected === 0)
      throw new NotFoundException(`Vacuna ${id} no encontrada`);
  }

  async count(): Promise<number> {
    return this.repo.count();
  }
}
