import { Controller, Get } from '@nestjs/common';
import { EnumsService } from '../services/enums.service';

@Controller('enums')
export class EnumsController {
  constructor(private readonly enumsService: EnumsService) {}

  @Get('cita/estados')
  getCitaEstados() {
    return this.enumsService.getCitaEstado();
  }

  @Get('cita/tipos')
  getTipoCita() {
    return this.enumsService.getTipoCita();
  }
}
