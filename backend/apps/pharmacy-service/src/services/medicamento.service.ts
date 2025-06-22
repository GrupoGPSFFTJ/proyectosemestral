import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medicamento } from '../entities/medicamento.entity';

@Injectable()
export class MedicamentoService {
  constructor(
    @InjectRepository(Medicamento)
    private repo: Repository<Medicamento>,
  ) {
  }

  create(data: Partial<Medicamento>): Promise<Medicamento> {
    const ent = this.repo.create(data);
    return this.repo.save(ent);
  }

  findAll(): Promise<Medicamento[]> {
    return this.repo.find();
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

  async remove(id: number): Promise<void> {
    const res = await this.repo.delete(id);
    if (res.affected === 0)
      throw new NotFoundException(`Medicamento ${id} no encontrado`);
  }

  async count(): Promise<number> {
    return this.repo.count();
  }
}
