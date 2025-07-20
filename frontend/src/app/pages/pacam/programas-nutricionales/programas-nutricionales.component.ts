import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { ProgramasNutricionalesDataService } from '../../../data-services/programas-nutricionales-data.service';
import { ProgramasNutricionales } from './programas-nutricionales.interface';

@Component({
  selector: 'app-programas-nutricionales',
  standalone: false,
  templateUrl: './programas-nutricionales.component.html',
  styleUrls: ['./programas-nutricionales.component.css']
})
export class ProgramasNutricionalesComponent implements OnInit {
  programasNutricionales: ProgramasNutricionales[] = [];
  loading = true;
  error: string | null = null;
  editingPrograma: ProgramasNutricionales | null = null;
  showModal = false;

  constructor(
    private apiService: ApiService,
    private programasNutricionalesDataService: ProgramasNutricionalesDataService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadAllData();
  }

  async loadAllData(): Promise<void> {
    try {
      this.loading = true;
      this.error = null;

      await this.programasNutricionalesDataService.loadStaticData();
      this.programasNutricionales = await this.apiService.getProgramasNutricionales();
      
      this.loading = false;
    } catch (error) {
      console.error('❌ [ProgramasNutricionalesComponent] Error al cargar datos:', error);
      this.loading = false;
      this.error = 'Error al cargar los programas nutricionales';
      this.programasNutricionales = [];
    }
  }

  // Modal methods
  openCreateModal(): void {
    this.editingPrograma = null;
    this.showModal = true;
  }

  openEditModal(programa: ProgramasNutricionales): void {
    this.editingPrograma = programa;
    this.showModal = true;
  }

  closeModal(): void {
    this.editingPrograma = null;
    this.showModal = false;
  }

  // CRUD operations
  async handleSave(programa: ProgramasNutricionales): Promise<void> {
    try {
      const newPrograma = await this.apiService.createProgramaNutricional(programa);
      this.programasNutricionales = [...this.programasNutricionales, newPrograma];
      this.closeModal();
    } catch (error) {
      console.error('Error al crear programa:', error);
      alert('Error al crear el programa nutricional');
    }
  }

  async handleUpdate(programa: ProgramasNutricionales): Promise<void> {
    try {
      const updatedPrograma = await this.apiService.updateProgramaNutricional(programa.id_programa_nutricional, programa);
      const index = this.programasNutricionales.findIndex(p => p.id_programa_nutricional === programa.id_programa_nutricional);
      if (index !== -1) {
        this.programasNutricionales[index] = updatedPrograma;
      }
      this.closeModal();
    } catch (error) {
      console.error('Error al actualizar programa:', error);
      alert('Error al actualizar el programa nutricional');
    }
  }

  async handleDelete(id: number): Promise<void> {
    if (!confirm('¿Está seguro de que desea eliminar este programa nutricional?')) {
      return;
    }

    try {
      await this.apiService.deleteProgramaNutricional(id);
      this.programasNutricionales = this.programasNutricionales.filter(p => p.id_programa_nutricional !== id);
    } catch (error) {
      console.error('Error al eliminar programa:', error);
      alert('Error al eliminar el programa nutricional');
    }
  }

  // Utility methods
  formatFecha(fecha: string): string {
    if (!fecha) return '';
    const [year, month, day] = fecha.split('-').map(Number);
    if (!year || !month || !day) return fecha;
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('es-CL');
  }
}