import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ControlDesembolso } from '../entities/control-desembolso.entity';

@Injectable()
export class ControlDesembolsoService {
  constructor(
    @InjectRepository(ControlDesembolso)
    private repo: Repository<ControlDesembolso>,
  ) {}

  create(data: Partial<ControlDesembolso>): Promise<ControlDesembolso> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  findAll(): Promise<ControlDesembolso[]> {
    return this.repo.find({ order: { id_control_desembolso: 'ASC' } });
  }

  async findOne(id: number): Promise<ControlDesembolso> {
    const item = await this.repo.findOne({
      where: { id_control_desembolso: id },
    });
    if (!item) throw new NotFoundException(`Control ${id} no encontrado`);
    return item;
  }

  async update(
    id: number,
    data: Partial<ControlDesembolso>,
  ): Promise<ControlDesembolso> {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
    return entity;
  }
}
