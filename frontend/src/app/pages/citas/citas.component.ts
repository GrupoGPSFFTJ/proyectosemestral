import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { CitasDataService } from '../../data-services/citas-data.service';
import { Cita } from './citas.interfaces';

@Component({
  selector: 'app-citas',
  standalone: false,
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.css'
})
export class CitasComponent implements OnInit {
  citas: Cita[] = [];
  loading = true;
  editingCita: Cita | null = null;
  showModal = false;

  constructor(
    private apiService: ApiService,
    private citasDataService: CitasDataService
  ) { }

  ngOnInit(): void {
    this.loadAllData();
  }

  async loadAllData(): Promise<void> {
    try {
      this.loading = true;

      // ✅ OPTIMIZACIÓN: Cargar datos principales Y estáticos EN PARALELO
      const [citasData] = await Promise.all([
        this.apiService.getCitas(),
        this.citasDataService.loadStaticData() // Se ejecuta en paralelo, no bloquea
      ]);

      // Mostrar las citas inmediatamente
      this.citas = citasData;
      this.loading = false;
    } catch (error) {
      console.error('❌ [CitasComponent] Error al cargar datos:', error);
      this.loading = false;
      // En caso de error, mostrar array vacío
      this.citas = [];
    }
  }

  getPacienteNombre(id_paciente: number): string {
    try {
      return this.citasDataService.getPacienteNombre(id_paciente);
    } catch {
      return `Paciente ${id_paciente}`;
    }
  }

  getCentroNombre(id_centro_salud: number): string {
    try {
      return this.citasDataService.getCentroNombre(id_centro_salud);
    } catch {
      return `Centro ${id_centro_salud}`;
    }
  }

  getUsuarioNombre(id_usuario: number): string {
    try {
      return this.citasDataService.getUsuarioNombre(id_usuario);
    } catch {
      return `Usuario ${id_usuario}`;
    }
  }

  getTipoLabel(tipo_cita: string): string {
    try {
      return this.citasDataService.getTipoLabel(tipo_cita);
    } catch {
      return tipo_cita;
    }
  }

  getEstadoLabel(estado: string): string {
    try {
      return this.citasDataService.getEstadoLabel(estado);
    } catch {
      return estado;
    }
  }

  formatFecha(fecha: string): string {
    if (!fecha) return '';
    // Espera formato YYYY-MM-DD
    const [year, month, day] = fecha.split('-').map(Number);
    if (!year || !month || !day) return fecha;
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('es-CL');
  }

  formatHora(hora: string): string {
      return hora || ''
  }

  openCreateModal(): void {
    this.editingCita = null;
    this.showModal = true;
  }

  openEditModal(cita: Cita): void {
    this.editingCita = cita;
    this.showModal = true;
  }

  closeModal(): void {
    this.editingCita = null;
    this.showModal = false;
  }

  saveCita(cita: Cita): void {
    this.citas = [...this.citas, cita];
    this.closeModal();
  }

  updateCita(cita: Cita): void {
    const index = this.citas.findIndex(c => c.id_cita === cita.id_cita);
    const updatedCitas = [...this.citas];
    updatedCitas[index] = cita;
    this.citas = updatedCitas;
    this.closeModal();
  }
}
