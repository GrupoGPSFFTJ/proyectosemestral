import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medicamento } from '../entities/medicamento.entity';

@Injectable()
export class MedicamentoService {
  constructor(
    @InjectRepository(Medicamento)
    private repo: Repository<Medicamento>,
  ) {}

  create(data: Partial<Medicamento>): Promise<Medicamento> {
    const ent = this.repo.create(data);
    return this.repo.save(ent);
  }

  findAll(): Promise<Medicamento[]> {
    return this.repo.find( { order: { id_medicamento: 'ASC' } });
  }

  async findOne(id: number): Promise<Medicamento> {
    const item = await this.repo.findOne({ where: { id_medicamento: id } });
    if (!item) throw new NotFoundException(`Medicamento ${id} no encontrado`);
    return item;
  }

  async update(id: number, data: Partial<Medicamento>): Promise<Medicamento> {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
    return entity;
  }

  async count(): Promise<number> {
    return this.repo.count();
  }
}
