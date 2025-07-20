import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MiembroFamiliar } from '../entities/miembro-familiar.entity';

@Injectable()
export class MiembroFamiliarService {
  constructor(
    @InjectRepository(MiembroFamiliar)
    private repo: Repository<MiembroFamiliar>,
  ) {}

  async create(miembroFamiliar: MiembroFamiliar): Promise<MiembroFamiliar> {
    return await this.repo.save(miembroFamiliar);
  }

  async findAll(): Promise<MiembroFamiliar[]> {
    return await this.repo.find({ order: { id_miembro_familiar: 'ASC' } });
  }

  async findOne(id: number): Promise<MiembroFamiliar> {
    const miembro = await this.repo.findOneBy({
      id_miembro_familiar: id,
    });
    if (!miembro) {
      throw new NotFoundException(
        `Miembro familiar con ID ${id} no encontrado`,
      );
    }
    return miembro;
  }

  async update(
    id: number,
    miembroFamiliar: MiembroFamiliar,
  ): Promise<MiembroFamiliar> {
    await this.findOne(id);
    miembroFamiliar.id_miembro_familiar = id;
    return await this.repo.save(miembroFamiliar);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
    return entity;
  }
}
