import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProgramaControl } from '../entities/programa-control.entity';

@Injectable()
export class ProgramaControlService {
  constructor(
    @InjectRepository(ProgramaControl)
    private programaControlRepository: Repository<ProgramaControl>,
  ) {
  }

  async create(programaControl: ProgramaControl): Promise<ProgramaControl> {
    return await this.programaControlRepository.save(programaControl);
  }

  async findAll(): Promise<ProgramaControl[]> {
    return await this.programaControlRepository.find();
  }

  async findOne(id: number): Promise<ProgramaControl> {
    const programa = await this.programaControlRepository.findOneBy({
      id_programa_control: id,
    });
    if (!programa) {
      throw new NotFoundException(
        `Programa de control con ID ${id} no encontrado`,
      );
    }
    return programa;
  }

  async update(
    id: number,
    programaControl: ProgramaControl,
  ): Promise<ProgramaControl> {
    await this.findOne(id);
    programaControl.id_programa_control = id;
    return await this.programaControlRepository.save(programaControl);
  }

  async remove(id: number): Promise<void> {
    const programa = await this.findOne(id);
    await this.programaControlRepository.remove(programa);
  }
}
