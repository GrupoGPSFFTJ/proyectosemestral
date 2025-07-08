import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FichaControl } from '../entities/ficha-control.entity';

@Injectable()
export class FichaControlService {
  constructor(
    @InjectRepository(FichaControl)
    private repo: Repository<FichaControl>,
  ) {}

  async create(fichaControl: FichaControl): Promise<FichaControl> {
    return await this.repo.save(fichaControl);
  }

  async findAll(): Promise<FichaControl[]> {
    return await this.repo.find();
  }

  async findOne(id: number): Promise<FichaControl> {
    const ficha = await this.repo.findOneBy({
      id_ficha_control: id,
    });
    if (!ficha) {
      throw new NotFoundException(
        `Ficha de control con ID ${id} no encontrada`,
      );
    }
    return ficha;
  }

  async update(id: number, fichaControl: FichaControl): Promise<FichaControl> {
    await this.findOne(id);
    fichaControl.id_ficha_control = id;
    return await this.repo.save(fichaControl);
  }

  async remove(id: number): Promise<void> {
    const ficha = await this.findOne(id);
    await this.repo.remove(ficha);
  }

  async count(): Promise<number> {
    return this.repo.count();
  }
}
