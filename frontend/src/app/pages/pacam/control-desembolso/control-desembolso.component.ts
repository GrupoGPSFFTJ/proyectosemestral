import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { ControlDesembolsoDataService } from '../../../data-services/control-desembolso-data.service';
import { ControlDesembolso } from './control-desembolso.interface';

@Component({
  selector: 'app-control-desembolso',
  standalone: false,
  templateUrl: './control-desembolso.component.html',
  styleUrls: ['./control-desembolso.component.css']
})
export class ControlDesembolsoComponent implements OnInit {
  desembolsos: ControlDesembolso[] = [];
  loading = true;
  editingDesembolso: ControlDesembolso | null = null;
  showModal = false;

  constructor(
    private apiService: ApiService,
    private controlDesembolsoDataService: ControlDesembolsoDataService
  ) {}

  ngOnInit(): void {
    this.loadAllData();
  }

  async loadAllData(): Promise<void> {
    try {
      this.loading = true;

      const [desembolsosData] = await Promise.all([
        this.apiService.getControlesDesembolso(),
        this.controlDesembolsoDataService.loadStaticData()
      ]);

      this.desembolsos = desembolsosData;
      this.loading = false;
    } catch (error) {
      console.error('Error al cargar datos de desembolsos:', error);
      this.loading = false;
      this.desembolsos = [];
    }
  }

  formatFecha(fecha: string): string {
    if (!fecha) return '';
    const [year, month, day] = fecha.split('-').map(Number);
    if (!year || !month || !day) return fecha;
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('es-CL');
  }

  formatCantidad(cantidad: number): string {
    return cantidad.toLocaleString('es-CL');
  }

  getInscripcionLabel(id_inscripcion_pacam: number): string {
    return this.controlDesembolsoDataService.getInscripcionLabel(id_inscripcion_pacam);
  }

  openCreateModal(): void {
    this.editingDesembolso = null;
    this.showModal = true;
  }

  openEditModal(desembolso: ControlDesembolso): void {
    this.editingDesembolso = desembolso;
    this.showModal = true;
  }

  closeModal(): void {
    this.editingDesembolso = null;
    this.showModal = false;
  }

  saveDesembolso(desembolso: ControlDesembolso): void {
    this.desembolsos = [...this.desembolsos, desembolso];
    this.closeModal();
  }

  updateDesembolso(desembolso: ControlDesembolso): void {
    const index = this.desembolsos.findIndex(d => d.id_control_desembolso === desembolso.id_control_desembolso);
    const updatedDesembolsos = [...this.desembolsos];
    updatedDesembolsos[index] = desembolso;
    this.desembolsos = updatedDesembolsos;
    this.closeModal();
  }
}
