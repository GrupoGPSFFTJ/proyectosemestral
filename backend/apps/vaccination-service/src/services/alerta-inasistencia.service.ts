import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlertaInasistencia } from '../entities/alerta-inasistencia.entity';

@Injectable()
export class AlertaInasistenciaService {
  constructor(
    @InjectRepository(AlertaInasistencia)
    private repo: Repository<AlertaInasistencia>,
  ) {}

  create(data: Partial<AlertaInasistencia>): Promise<AlertaInasistencia> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  findAll(): Promise<AlertaInasistencia[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<AlertaInasistencia> {
    const item = await this.repo.findOne({
      where: { id_alerta_inasistencia: id },
    });
    if (!item)
      throw new NotFoundException(`AlertaInasistencia ${id} no encontrada`);
    return item;
  }

  async update(
    id: number,
    data: Partial<AlertaInasistencia>,
  ): Promise<AlertaInasistencia> {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const res = await this.repo.delete(id);
    if (res.affected === 0)
      throw new NotFoundException(`AlertaInasistencia ${id} no encontrada`);
  }
}
