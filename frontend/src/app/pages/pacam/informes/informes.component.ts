import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { InformePacamDataService } from '../../../data-services/informe-pacam-data.service';
import { InformePacam } from './informe-pacam.interface';

@Component({
  selector: 'app-informes',
  standalone: false,
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {
  informes: InformePacam[] = [];
  loading = true;
  editingInforme: InformePacam | null = null;
  showModal = false;

  constructor(
    private apiService: ApiService,
    private informePacamDataService: InformePacamDataService
  ) {}

  ngOnInit(): void {
    this.loadAllData();
  }

  async loadAllData(): Promise<void> {
    try {
      this.loading = true;

      const [informesData] = await Promise.all([
        this.apiService.getInformesPacam(),
        this.informePacamDataService.loadStaticData()
      ]);

      this.informes = informesData;
      this.loading = false;
    } catch (error) {
      console.error('Error al cargar datos de informes:', error);
      this.loading = false;
      this.informes = [];
    }
  }

  formatFecha(fecha: string): string {
    if (!fecha) return '';
    const [year, month, day] = fecha.split('-').map(Number);
    if (!year || !month || !day) return fecha;
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('es-CL');
  }

  formatTotal(total: number): string {
    return total.toLocaleString('es-CL');
  }

  getInformeLabel(id_informe_pacam: number): string {
    return this.informePacamDataService.getInformeLabel(id_informe_pacam);
  }

  openCreateModal(): void {
    this.editingInforme = null;
    this.showModal = true;
  }

  openEditModal(informe: InformePacam): void {
    this.editingInforme = informe;
    this.showModal = true;
  }

  closeModal(): void {
    this.editingInforme = null;
    this.showModal = false;
  }

  saveInforme(informe: InformePacam): void {
    this.informes = [...this.informes, informe];
    this.closeModal();
  }

  updateInforme(informe: InformePacam): void {
    const index = this.informes.findIndex(i => i.id_informe_pacam === informe.id_informe_pacam);
    const updatedInformes = [...this.informes];
    updatedInformes[index] = informe;
    this.informes = updatedInformes;
    this.closeModal();
  }
}
