import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cita } from '../entities/cita.entity';

@Injectable()
export class CitaService {
  constructor(
    @InjectRepository(Cita)
    private readonly citaRepo: Repository<Cita>,
  ) {}

  async create(data: Partial<Cita>): Promise<Cita> {
    const cita = this.citaRepo.create(data);
    return this.citaRepo.save(cita);
  }

  findAll(): Promise<Cita[]> {
    return this.citaRepo.find();
  }

  async findOne(id: number): Promise<Cita> {
    const cita = await this.citaRepo.findOneBy({ id_cita: id });
    if (!cita) {
      throw new NotFoundException(`Cita con id ${id} no encontrada`);
    }
    return cita;
  }

  async update(id: number, data: Partial<Cita>): Promise<Cita> {
    const cita = await this.findOne(id);
    Object.assign(cita, data);
    return this.citaRepo.save(cita);
  }

  async remove(id: number): Promise<void> {
    const result = await this.citaRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Cita con id ${id} no encontrada`);
    }
  }

  async count(): Promise<number> {
    return this.citaRepo.count();
  }
}
