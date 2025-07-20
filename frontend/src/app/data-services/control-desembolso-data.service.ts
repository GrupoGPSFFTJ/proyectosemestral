import { Injectable } from '@angular/core';
import { ControlDesembolso } from '../pages/pacam/control-desembolso/control-desembolso.interface';
import { InscripcionPacam } from '../pages/pacam/inscripciones/inscripcion-pacam.interface';
import { ApiService } from '../../services/api.service';

@Injectable({ providedIn: 'root' })
export class ControlDesembolsoDataService {
  private controles: ControlDesembolso[] = [];
  private inscripciones: InscripcionPacam[] = [];
  private isLoaded = false;

  constructor(private apiService: ApiService) {}

  async loadStaticData(): Promise<void> {
    if (this.isLoaded) return;
    const [controles, inscripciones] = await Promise.all([
      this.apiService.getControlesDesembolso(),
      this.apiService.getInscripcionesPacam()
    ]);
    this.controles = controles;
    this.inscripciones = inscripciones;
    this.isLoaded = true;
  }

  getInscripcionLabel(id: number): string {
    const insc = this.inscripciones.find(i => i.id_inscripcion_pacam === id);
    return insc ? `Inscripción #${insc.id_inscripcion_pacam}` : id.toString();
  }

  getInscripcionesForSelect(): Array<{id: number, nombre: string}> {
    return this.inscripciones.map(insc => ({
      id: insc.id_inscripcion_pacam,
      nombre: `Inscripción #${insc.id_inscripcion_pacam}`
    }));
  }

  getControles(): ControlDesembolso[] {
    return this.controles;
  }

  getControlesByInscripcion(id_inscripcion_pacam: number): ControlDesembolso[] {
    return this.controles.filter(c => c.id_inscripcion_pacam === id_inscripcion_pacam);
  }

  async refreshData(): Promise<void> {
    this.isLoaded = false;
    await this.loadStaticData();
  }
}
