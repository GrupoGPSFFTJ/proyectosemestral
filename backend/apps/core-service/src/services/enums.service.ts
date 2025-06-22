import { Injectable } from '@nestjs/common';
import { UsuarioEstado } from '../entities/usuario.entity';

@Injectable()
export class EnumsService {
  getUsuarioEstado(): UsuarioEstado[] {
    return Object.values(UsuarioEstado);
  }
}
