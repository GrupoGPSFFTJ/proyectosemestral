import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstratificacionRiesgo } from '../entities/estratificacion-riesgo.entity';

@Injectable()
export class EstratificacionRiesgoService {
  constructor(
    @InjectRepository(EstratificacionRiesgo)
    private readonly repo: Repository<EstratificacionRiesgo>,
  ) {}

  async create(
    data: Partial<EstratificacionRiesgo>,
  ): Promise<EstratificacionRiesgo> {
    const item = this.repo.create(data);
    return this.repo.save(item);
  }

  findAll(): Promise<EstratificacionRiesgo[]> {
    return this.repo.find(); // Enum, no aplica orden por ID
  }

  async findOne(id: number): Promise<EstratificacionRiesgo> {
    const item = await this.repo.findOneBy({ idEstratificacionRiesgo: id });
    if (!item) {
      throw new NotFoundException(`Estratificación con id ${id} no encontrada`);
    }
    return item;
  }

  async update(
    id: number,
    data: Partial<EstratificacionRiesgo>,
  ): Promise<EstratificacionRiesgo> {
    const item = await this.findOne(id);
    Object.assign(item, data);
    return this.repo.save(item);
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
