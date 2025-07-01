import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoRelacion } from '../entities/tipo-relacion.entity';

@Injectable()
export class TipoRelacionService {
  constructor(
    @InjectRepository(TipoRelacion)
    private tipoRelacionRepository: Repository<TipoRelacion>,
  ) {}

  async create(tipoRelacion: TipoRelacion): Promise<TipoRelacion> {
    return await this.tipoRelacionRepository.save(tipoRelacion);
  }

  async findAll(): Promise<TipoRelacion[]> {
    return await this.tipoRelacionRepository.find();
  }

  async findOne(id: number): Promise<TipoRelacion> {
    const tipoRelacion = await this.tipoRelacionRepository.findOneBy({
      id_tipo_relacion: id,
    });
    if (!tipoRelacion) {
      throw new NotFoundException(`Tipo relación con ID ${id} no encontrado`);
    }
    return tipoRelacion;
  }

  async update(id: number, tipoRelacion: TipoRelacion): Promise<TipoRelacion> {
    await this.findOne(id);
    tipoRelacion.id_tipo_relacion = id;
    return await this.tipoRelacionRepository.save(tipoRelacion);
  }

  async remove(id: number): Promise<void> {
    const tipoRelacion = await this.findOne(id);
    await this.tipoRelacionRepository.remove(tipoRelacion);
  }
}
