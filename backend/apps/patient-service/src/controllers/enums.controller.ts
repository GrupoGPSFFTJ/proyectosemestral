import { Controller, Get } from '@nestjs/common';
import { EnumsService } from '../services/enums.service';

@Controller('enums')
export class EnumsController {
  constructor(private readonly enumsService: EnumsService) {
  }

  @Get('usuario/estados')
  getCitaEstados() {
    return this.enumsService.getGeneros();
  }
}
