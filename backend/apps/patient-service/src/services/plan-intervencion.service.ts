import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlanIntervencion } from '../entities/plan-intervencion.entity';

@Injectable()
export class PlanIntervencionService {
  constructor(
    @InjectRepository(PlanIntervencion)
    private repo: Repository<PlanIntervencion>,
  ) {}

  async create(planIntervencion: PlanIntervencion): Promise<PlanIntervencion> {
    return await this.repo.save(planIntervencion);
  }

  async findAll(): Promise<PlanIntervencion[]> {
    return await this.repo.find({ order: { id_plan_intervencion: 'ASC' } });
  }

  async findOne(id: number): Promise<PlanIntervencion> {
    const plan = await this.repo.findOneBy({
      id_plan_intervencion: id,
    });
    if (!plan) {
      throw new NotFoundException(
        `Plan de intervención con ID ${id} no encontrado`,
      );
    }
    return plan;
  }

  async update(
    id: number,
    planIntervencion: PlanIntervencion,
  ): Promise<PlanIntervencion> {
    await this.findOne(id);
    planIntervencion.id_plan_intervencion = id;
    return await this.repo.save(planIntervencion);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
    return entity;
  }
}
