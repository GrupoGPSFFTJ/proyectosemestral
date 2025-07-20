import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DespachoMedicamento } from '../entities/despacho-medicamento.entity';

@Injectable()
export class DespachoMedicamentoService {
  constructor(
    @InjectRepository(DespachoMedicamento)
    private repo: Repository<DespachoMedicamento>,
  ) {}

  create(data: Partial<DespachoMedicamento>): Promise<DespachoMedicamento> {
    const ent = this.repo.create(data);
    return this.repo.save(ent);
  }

  findAll(): Promise<DespachoMedicamento[]> {
    return this.repo.find({ order: { id_despacho: 'ASC' } });
  }

  async findOne(id: number): Promise<DespachoMedicamento> {
    const item = await this.repo.findOne({ where: { id_despacho: id } });
    if (!item)
      throw new NotFoundException(`DespachoMedicamento ${id} no encontrado`);
    return item;
  }

  async update(
    id: number,
    data: Partial<DespachoMedicamento>,
  ): Promise<DespachoMedicamento> {
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
