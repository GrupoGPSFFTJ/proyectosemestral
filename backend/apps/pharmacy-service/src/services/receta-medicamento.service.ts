import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecetaMedicamento } from '../entities/receta-medicamento.entity';

@Injectable()
export class RecetaMedicamentoService {
  constructor(
    @InjectRepository(RecetaMedicamento)
    private repo: Repository<RecetaMedicamento>,
  ) {}

  create(data: Partial<RecetaMedicamento>): Promise<RecetaMedicamento> {
    const ent = this.repo.create(data);
    return this.repo.save(ent);
  }

  findAll(): Promise<RecetaMedicamento[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<RecetaMedicamento> {
    const item = await this.repo.findOne({
      where: { id_receta_medicamento: id },
    });
    if (!item)
      throw new NotFoundException(`RecetaMedicamento ${id} no encontrado`);
    return item;
  }

  async update(
    id: number,
    data: Partial<RecetaMedicamento>,
  ): Promise<RecetaMedicamento> {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
    return entity;
  }

  async findByReceta(id: number): Promise<RecetaMedicamento[]> {
    const medicamentos = await this.repo.find({ 
      where: { id_receta: id } 
    });
    return medicamentos;
  }
}
