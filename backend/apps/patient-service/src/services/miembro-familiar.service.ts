import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MiembroFamiliar } from '../entities/miembro-familiar.entity';

@Injectable()
export class MiembroFamiliarService {
  constructor(
    @InjectRepository(MiembroFamiliar)
    private miembroFamiliarRepository: Repository<MiembroFamiliar>,
  ) {
  }

  async create(miembroFamiliar: MiembroFamiliar): Promise<MiembroFamiliar> {
    return await this.miembroFamiliarRepository.save(miembroFamiliar);
  }

  async findAll(): Promise<MiembroFamiliar[]> {
    return await this.miembroFamiliarRepository.find();
  }

  async findOne(id: number): Promise<MiembroFamiliar> {
    const miembro = await this.miembroFamiliarRepository.findOneBy({
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
    return await this.miembroFamiliarRepository.save(miembroFamiliar);
  }

  async remove(id: number): Promise<void> {
    const miembro = await this.findOne(id);
    await this.miembroFamiliarRepository.remove(miembro);
  }
}
