import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InscripcionPacam } from '../entities/inscripcion-pacam.entity';

@Injectable()
export class InscripcionPacamService {
  constructor(
    @InjectRepository(InscripcionPacam)
    private repo: Repository<InscripcionPacam>,
  ) {}

  create(data: Partial<InscripcionPacam>): Promise<InscripcionPacam> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  findAll(): Promise<InscripcionPacam[]> {
    return this.repo.find({ order: { id_inscripcion_pacam: 'ASC' } });
  }

  async findOne(id: number): Promise<InscripcionPacam> {
    const item = await this.repo.findOne({
      where: { id_inscripcion_pacam: id },
    });
    if (!item) throw new NotFoundException(`Inscripción ${id} no encontrada`);
    return item;
  }

  async update(
    id: number,
    data: Partial<InscripcionPacam>,
  ): Promise<InscripcionPacam> {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
    return entity;
  }
}
