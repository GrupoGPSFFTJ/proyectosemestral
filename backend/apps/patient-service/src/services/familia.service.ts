import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Familia } from '../entities/familia.entity';

@Injectable()
export class FamiliaService {
  constructor(
    @InjectRepository(Familia)
    private repo: Repository<Familia>,
  ) {}

  async create(familia: Familia): Promise<Familia> {
    return await this.repo.save(familia);
  }

  async findAll(): Promise<Familia[]> {
    return await this.repo.find();
  }

  async findOne(id: number): Promise<Familia> {
    const familia = await this.repo.findOneBy({
      id_familia: id,
    });
    if (!familia) {
      throw new NotFoundException(`Familia con ID ${id} no encontrada`);
    }
    return familia;
  }

  async update(id: number, familia: Familia): Promise<Familia> {
    await this.findOne(id);
    familia.id_familia = id;
    return await this.repo.save(familia);
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
