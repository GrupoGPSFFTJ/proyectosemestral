import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FichaOdontologica } from '../entities/ficha-odontologica.entity';

@Injectable()
export class FichaOdontologicaService {
  constructor(
    @InjectRepository(FichaOdontologica)
    private readonly repo: Repository<FichaOdontologica>,
  ) {
  }

  create(data: Partial<FichaOdontologica>): Promise<FichaOdontologica> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  findAll(): Promise<FichaOdontologica[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<FichaOdontologica> {
    const item = await this.repo.findOne({
      where: { id_ficha_odontologica: id },
    });
    if (!item)
      throw new NotFoundException(`FichaOdontologica ${id} no encontrada`);
    return item;
  }

  async update(
    id: number,
    data: Partial<FichaOdontologica>,
  ): Promise<FichaOdontologica> {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const res = await this.repo.delete(id);
    if (res.affected === 0)
      throw new NotFoundException(`FichaOdontologica ${id} no encontrada`);
  }

  async count(): Promise<number> {
    return this.repo.count();
  }
}
