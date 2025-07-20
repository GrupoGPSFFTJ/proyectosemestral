import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { InscripcionPacamDataService } from '../../../data-services/inscripcion-pacam-data.service';
import { InscripcionPacam } from './inscripcion-pacam.interface';

@Component({
  selector: 'app-inscripciones',
  standalone: false,
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.css']
})
export class InscripcionesComponent implements OnInit {
  inscripciones: InscripcionPacam[] = [];
  loading = true;
  editingInscripcion: InscripcionPacam | null = null;
  showModal = false;

  constructor(
    private apiService: ApiService,
    private inscripcionPacamDataService: InscripcionPacamDataService
  ) {}

  ngOnInit(): void {
    this.loadAllData();
  }

  async loadAllData(): Promise<void> {
    try {
      this.loading = true;

      const [inscripcionesData] = await Promise.all([
        this.apiService.getInscripcionesPacam(),
        this.inscripcionPacamDataService.loadStaticData()
      ]);

      this.inscripciones = inscripcionesData;
      this.loading = false;
    } catch (error) {
      console.error('Error al cargar datos de inscripciones:', error);
      this.loading = false;
      this.inscripciones = [];
    }
  }

  formatFecha(fecha: string): string {
    if (!fecha) return '';
    const [year, month, day] = fecha.split('-').map(Number);
    if (!year || !month || !day) return fecha;
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('es-CL');
  }

  formatEstado(estado: string): string {
    return estado.charAt(0).toUpperCase() + estado.slice(1).toLowerCase();
  }

  getPacienteLabel(id_paciente: number | null): string {
    if (id_paciente === null) return 'Paciente no asignado';
    return this.inscripcionPacamDataService.getPacienteLabel(id_paciente);
  }

  getCentroLabel(id_centro_salud: number): string {
    return this.inscripcionPacamDataService.getCentroLabel(id_centro_salud);
  }

  getProgramaLabel(id_programa_nutricional: number): string {
    return this.inscripcionPacamDataService.getProgramaLabel(id_programa_nutricional);
  }

  openCreateModal(): void {
    this.editingInscripcion = null;
    this.showModal = true;
  }

  openEditModal(inscripcion: InscripcionPacam): void {
    this.editingInscripcion = inscripcion;
    this.showModal = true;
  }

  closeModal(): void {
    this.editingInscripcion = null;
    this.showModal = false;
  }

  saveInscripcion(inscripcion: InscripcionPacam): void {
    this.inscripciones = [...this.inscripciones, inscripcion];
    this.closeModal();
  }

  updateInscripcion(inscripcion: InscripcionPacam): void {
    const index = this.inscripciones.findIndex(i => i.id_inscripcion_pacam === inscripcion.id_inscripcion_pacam);
    const updatedInscripciones = [...this.inscripciones];
    updatedInscripciones[index] = inscripcion;
    this.inscripciones = updatedInscripciones;
    this.closeModal();
  }
}
