import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProgramaNutricional } from '../entities/programa-nutricional.entity';

@Injectable()
export class ProgramaNutricionalService {
  constructor(
    @InjectRepository(ProgramaNutricional)
    private repo: Repository<ProgramaNutricional>,
  ) {}

  create(data: Partial<ProgramaNutricional>): Promise<ProgramaNutricional> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  findAll(): Promise<ProgramaNutricional[]> {
    return this.repo.find({ order: { id_programa_nutricional: 'ASC' } });
  }

  async findOne(id: number): Promise<ProgramaNutricional> {
    const item = await this.repo.findOne({
      where: { id_programa_nutricional: id },
    });
    if (!item) throw new NotFoundException(`Programa ${id} no encontrado`);
    return item;
  }

  async update(
    id: number,
    data: Partial<ProgramaNutricional>,
  ): Promise<ProgramaNutricional> {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
    return entity;
  }
}
