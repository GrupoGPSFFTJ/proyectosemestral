import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CalendarioVacuna } from '../entities/calendario-vacuna.entity';

@Injectable()
export class CalendarioVacunaService {
  constructor(
    @InjectRepository(CalendarioVacuna)
    private repo: Repository<CalendarioVacuna>,
  ) {}

  create(data: Partial<CalendarioVacuna>): Promise<CalendarioVacuna> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  findAll(): Promise<CalendarioVacuna[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<CalendarioVacuna> {
    const item = await this.repo.findOne({
      where: { id_calendario_vacuna: id },
    });
    if (!item)
      throw new NotFoundException(`CalendarioVacuna ${id} no encontrado`);
    return item;
  }

  async update(
    id: number,
    data: Partial<CalendarioVacuna>,
  ): Promise<CalendarioVacuna> {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const res = await this.repo.delete(id);
    if (res.affected === 0)
      throw new NotFoundException(`CalendarioVacuna ${id} no encontrado`);
  }
}
