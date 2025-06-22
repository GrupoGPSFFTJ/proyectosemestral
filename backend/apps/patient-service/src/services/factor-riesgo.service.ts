import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FactorRiesgo } from '../entities/factor-riesgo.entity';

@Injectable()
export class FactorRiesgoService {
  constructor(
    @InjectRepository(FactorRiesgo)
    private factorRiesgoRepository: Repository<FactorRiesgo>,
  ) {
  }

  async create(factorRiesgo: FactorRiesgo): Promise<FactorRiesgo> {
    return await this.factorRiesgoRepository.save(factorRiesgo);
  }

  async findAll(): Promise<FactorRiesgo[]> {
    return await this.factorRiesgoRepository.find();
  }

  async findOne(id: number): Promise<FactorRiesgo> {
    const factor = await this.factorRiesgoRepository.findOneBy({
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
    return await this.factorRiesgoRepository.save(factorRiesgo);
  }

  async remove(id: number): Promise<void> {
    const factor = await this.findOne(id);
    await this.factorRiesgoRepository.remove(factor);
  }
}
