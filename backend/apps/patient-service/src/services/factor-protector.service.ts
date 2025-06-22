import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FactorProtector } from '../entities/factor-protector.entity';

@Injectable()
export class FactorProtectorService {
  constructor(
    @InjectRepository(FactorProtector)
    private factorProtectorRepository: Repository<FactorProtector>,
  ) {
  }

  async create(factorProtector: FactorProtector): Promise<FactorProtector> {
    return await this.factorProtectorRepository.save(factorProtector);
  }

  async findAll(): Promise<FactorProtector[]> {
    return await this.factorProtectorRepository.find();
  }

  async findOne(id: number): Promise<FactorProtector> {
    const factor = await this.factorProtectorRepository.findOneBy({
      id_factor_protector: id,
    });
    if (!factor) {
      throw new NotFoundException(
        `Factor protector con ID ${id} no encontrado`,
      );
    }
    return factor;
  }

  async update(
    id: number,
    factorProtector: FactorProtector,
  ): Promise<FactorProtector> {
    await this.findOne(id);
    factorProtector.id_factor_protector = id;
    return await this.factorProtectorRepository.save(factorProtector);
  }

  async remove(id: number): Promise<void> {
    const factor = await this.findOne(id);
    await this.factorProtectorRepository.remove(factor);
  }
}
