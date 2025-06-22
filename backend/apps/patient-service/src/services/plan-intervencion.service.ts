import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlanIntervencion } from '../entities/plan-intervencion.entity';

@Injectable()
export class PlanIntervencionService {
  constructor(
    @InjectRepository(PlanIntervencion)
    private planIntervencionRepository: Repository<PlanIntervencion>,
  ) {
  }

  async create(planIntervencion: PlanIntervencion): Promise<PlanIntervencion> {
    return await this.planIntervencionRepository.save(planIntervencion);
  }

  async findAll(): Promise<PlanIntervencion[]> {
    return await this.planIntervencionRepository.find();
  }

  async findOne(id: number): Promise<PlanIntervencion> {
    const plan = await this.planIntervencionRepository.findOneBy({
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
    return await this.planIntervencionRepository.save(planIntervencion);
  }

  async remove(id: number): Promise<void> {
    const plan = await this.findOne(id);
    await this.planIntervencionRepository.remove(plan);
  }
}
