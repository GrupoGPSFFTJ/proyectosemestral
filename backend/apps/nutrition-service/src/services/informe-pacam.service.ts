import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InformePacam } from '../entities/informe-pacam.entity';

@Injectable()
export class InformePacamService {
  constructor(
    @InjectRepository(InformePacam)
    private repo: Repository<InformePacam>,
  ) {}

  create(data: Partial<InformePacam>): Promise<InformePacam> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  findAll(): Promise<InformePacam[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<InformePacam> {
    const item = await this.repo.findOne({ where: { id_informe_pacam: id } });
    if (!item) throw new NotFoundException(`Informe ${id} no encontrado`);
    return item;
  }

  async update(id: number, data: Partial<InformePacam>): Promise<InformePacam> {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const res = await this.repo.delete(id);
    if (res.affected === 0)
      throw new NotFoundException(`Informe ${id} no encontrado`);
  }
}
