import { Injectable } from '@angular/core';
import { InscripcionPacam } from '../pages/pacam/inscripciones/inscripcion-pacam.interface';
import { ApiService } from '../../services/api.service';

@Injectable({ providedIn: 'root' })
export class InscripcionPacamDataService {
  private inscripciones: InscripcionPacam[] = [];
  private pacientes: any[] = [];
  private centrosSalud: any[] = [];
  private programasNutricionales: any[] = [];
  private isLoaded = false;

  constructor(private apiService: ApiService) {}

  async loadStaticData(): Promise<void> {
    if (this.isLoaded) return;
    const [inscripciones, pacientes, centros, programasNutricionales] = await Promise.all([
      this.apiService.getInscripcionesPacam(),
      this.apiService.getPacientes(),
      this.apiService.getCentrosSalud(),
      this.apiService.getProgramasNutricionales()
    ]);
    this.inscripciones = inscripciones;
    this.pacientes = pacientes;
    this.centrosSalud = centros;
    this.programasNutricionales = programasNutricionales;
    this.isLoaded = true;
  }

  getInscripcionLabel(id: number): string {
    const insc = this.inscripciones.find(i => i.id_inscripcion_pacam === id);
    return insc ? `Inscripción #${insc.id_inscripcion_pacam}` : id.toString();
  }

  getPacienteLabel(id_paciente: number): string {
    const paciente = this.pacientes.find(p => p.id_paciente === id_paciente);
    return paciente ? `${paciente.nombre} ${paciente.apellido_paterno} ${paciente.apellido_materno}` : `Paciente ${id_paciente}`;
  }

  getCentroLabel(id_centro_salud: number): string {
    const centro = this.centrosSalud.find(c => c.id_centro_salud === id_centro_salud);
    return centro ? centro.nombre : `Centro ${id_centro_salud}`;
  }

  getProgramaLabel(id_programa_nutricional: number): string {
    const programa = this.programasNutricionales.find(p => p.id_programa_nutricional === id_programa_nutricional);
    return programa ? programa.nombre : `Programa ${id_programa_nutricional}`;
  }

  getPacientesForSelect(): Array<{id: number, nombre: string}> {
    return this.pacientes.map(paciente => ({
      id: paciente.id_paciente,
      nombre: `${paciente.nombre} ${paciente.apellido_paterno} ${paciente.apellido_materno}`
    }));
  }

  getCentrosSaludForSelect(): Array<{id: number, nombre: string}> {
    return this.centrosSalud.map(centro => ({
      id: centro.id_centro_salud,
      nombre: centro.nombre
    }));
  }

  getProgramasNutricionalesForSelect(): Array<{id: number, nombre: string}> {
    return this.programasNutricionales.map(programa => ({
      id: programa.id_programa_nutricional,
      nombre: programa.nombre
    }));
  }

  getInscripciones(): InscripcionPacam[] {
    return this.inscripciones;
  }

  async refreshData(): Promise<void> {
    this.isLoaded = false;
    await this.loadStaticData();
  }
}
