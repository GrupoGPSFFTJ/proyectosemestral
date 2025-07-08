import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistorialResultado } from '../entities/historial-resultado.entity';

@Injectable()
export class HistorialResultadoService {
  constructor(
    @InjectRepository(HistorialResultado)
    private repo: Repository<HistorialResultado>,
  ) {}

  async create(
    historialResultado: HistorialResultado,
  ): Promise<HistorialResultado> {
    return await this.repo.save(historialResultado);
  }

  async findAll(): Promise<HistorialResultado[]> {
    return await this.repo.find();
  }

  async findOne(id: number): Promise<HistorialResultado> {
    const historial = await this.repo.findOneBy({
      id_historial_resultado: id,
    });
    if (!historial) {
      throw new NotFoundException(
        `Historial resultado con ID ${id} no encontrado`,
      );
    }
    return historial;
  }

  async update(
    id: number,
    historialResultado: HistorialResultado,
  ): Promise<HistorialResultado> {
    const existingHistorial = await this.findOne(id);
    if (!existingHistorial) {
      throw new NotFoundException(
        `Historial resultado con ID ${id} no encontrado`,
      );
    }
    historialResultado.id_historial_resultado = id;
    return await this.repo.save(historialResultado);
  }

  async remove(id: number): Promise<void> {
    const historial = await this.findOne(id);
    await this.repo.remove(historial);
  }
}
