import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CentroSalud } from '../entities/centro-salud.entity';

@Injectable()
export class CentroSaludService {
  constructor(
    @InjectRepository(CentroSalud)
    private readonly repo: Repository<CentroSalud>,
  ) {}

  findAll(): Promise<CentroSalud[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<CentroSalud> {
    const cs = await this.repo.findOneBy({ id_centro_salud: id });
    if (!cs) throw new NotFoundException(`Centro ${id} no encontrado`);
    return cs;
  }

  create(dto: Partial<CentroSalud>): Promise<CentroSalud> {
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: number, dto: Partial<CentroSalud>) {
    await this.findOne(id);
    return this.repo.update(id, dto);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.repo.delete(id);
  }
}
