import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cita } from '../entities/cita.entity';

@Injectable()
export class CitaService {
  constructor(
    @InjectRepository(Cita)
    private readonly repo: Repository<Cita>,
  ) {}

  async create(data: Partial<Cita>): Promise<Cita> {
    const cita = this.repo.create(data);
    return this.repo.save(cita);
  }

  findAll(): Promise<Cita[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Cita> {
    const cita = await this.repo.findOneBy({ id_cita: id });
    if (!cita) {
      throw new NotFoundException(`Cita con id ${id} no encontrada`);
    }
    return cita;
  }

  async update(id: number, data: Partial<Cita>): Promise<Cita> {
    const cita = await this.findOne(id);
    Object.assign(cita, data);
    return this.repo.save(cita);
  }

  async remove(id: number): Promise<void> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Cita con id ${id} no encontrada`);
    }
  }

  async count(): Promise<number> {
    return this.repo.count();
  }
}
