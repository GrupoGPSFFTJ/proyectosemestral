import { Injectable } from '@nestjs/common';
import { CitaEstado, TipoCita } from '../entities/cita.entity';

@Injectable()
export class EnumsService {
  getCitaEstado(): CitaEstado[] {
    return Object.values(CitaEstado);
  }

  getTipoCita(): TipoCita[] {
    return Object.values(TipoCita);
  }
}
