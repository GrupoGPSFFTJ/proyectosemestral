import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegistroVacunacion } from '../entities/registro-vacunacion.entity';

@Injectable()
export class RegistroVacunacionService {
  constructor(
    @InjectRepository(RegistroVacunacion)
    private repo: Repository<RegistroVacunacion>,
  ) {}

  create(data: Partial<RegistroVacunacion>): Promise<RegistroVacunacion> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  findAll(): Promise<RegistroVacunacion[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<RegistroVacunacion> {
    const item = await this.repo.findOne({
      where: { id_registro_vacunacion: id },
    });
    if (!item)
      throw new NotFoundException(`RegistroVacunacion ${id} no encontrado`);
    return item;
  }

  async update(
    id: number,
    data: Partial<RegistroVacunacion>,
  ): Promise<RegistroVacunacion> {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const res = await this.repo.delete(id);
    if (res.affected === 0)
      throw new NotFoundException(`RegistroVacunacion ${id} no encontrado`);
  }
}
