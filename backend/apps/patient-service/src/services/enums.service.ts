import { Injectable } from '@nestjs/common';
import { PacienteGenero } from '../entities/paciente.entity';

@Injectable()
export class EnumsService {
  getGeneros(): PacienteGenero[] {
    return Object.values(PacienteGenero);
  }
}
