import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Paciente } from '../entities/paciente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PacienteService {
  constructor(
    @InjectRepository(Paciente)
    private repo: Repository<Paciente>,
  ) {}

  async create(paciente: Paciente): Promise<Paciente> {
    return await this.repo.save(paciente);
  }

  async findAll(): Promise<Paciente[]> {
    return await this.repo.find();
  }

  async findOne(id: number): Promise<Paciente> {
    const paciente = await this.repo.findOneBy({
      id_paciente: id,
    });
    if (!paciente) {
      throw new NotFoundException(`Paciente con ID ${id} no encontrado`);
    }
    return paciente;
  }

  async update(id: number, paciente: Paciente): Promise<Paciente> {
    await this.findOne(id);
    paciente.id_paciente = id;
    return await this.repo.save(paciente);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
    return entity;
  }

  async count(): Promise<number> {
    return this.repo.count();
  }
}
