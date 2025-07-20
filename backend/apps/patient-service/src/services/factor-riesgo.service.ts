import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FactorRiesgo } from '../entities/factor-riesgo.entity';

@Injectable()
export class FactorRiesgoService {
  constructor(
    @InjectRepository(FactorRiesgo)
    private repo: Repository<FactorRiesgo>,
  ) {}

  async create(factorRiesgo: FactorRiesgo): Promise<FactorRiesgo> {
    return await this.repo.save(factorRiesgo);
  }

  async findAll(): Promise<FactorRiesgo[]> {
    return await this.repo.find({ order: { id_factor_riesgo: 'ASC' } });
  }

  async findOne(id: number): Promise<FactorRiesgo> {
    const factor = await this.repo.findOneBy({
      id_factor_riesgo: id,
    });
    if (!factor) {
      throw new NotFoundException(
        `Factor de riesgo con ID ${id} no encontrado`,
      );
    }
    return factor;
  }

  async update(id: number, factorRiesgo: FactorRiesgo): Promise<FactorRiesgo> {
    await this.findOne(id);
    factorRiesgo.id_factor_riesgo = id;
    return await this.repo.save(factorRiesgo);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
    return entity;
  }
}
