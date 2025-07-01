import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProgramaSaludOral } from '../entities/programa-salud-oral.entity';

@Injectable()
export class ProgramaSaludOralService {
  constructor(
    @InjectRepository(ProgramaSaludOral)
    private readonly repo: Repository<ProgramaSaludOral>,
  ) {}

  create(data: Partial<ProgramaSaludOral>): Promise<ProgramaSaludOral> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  findAll(): Promise<ProgramaSaludOral[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<ProgramaSaludOral> {
    const item = await this.repo.findOne({
      where: { id_programa_salud_oral: id },
    });
    if (!item)
      throw new NotFoundException(`ProgramaSaludOral ${id} no encontrado`);
    return item;
  }

  async update(
    id: number,
    data: Partial<ProgramaSaludOral>,
  ): Promise<ProgramaSaludOral> {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const res = await this.repo.delete(id);
    if (res.affected === 0)
      throw new NotFoundException(`ProgramaSaludOral ${id} no encontrado`);
  }
}
