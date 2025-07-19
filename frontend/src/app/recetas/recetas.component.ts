import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { RecetasDataService } from '../data-services/recetas-data.service';
import {
  Receta,
  RecetaMedicamento,
  RecetaMedicamentoForm,
  RecetaMedicamentoDetalle
} from './recetas.interfaces';
import { ModalComponent } from '../components/modal/modal.component';

@Component({
  selector: 'app-recetas',
  standalone: false,
  templateUrl: './recetas.component.html',
  styleUrl: './recetas.component.css',
})
export class RecetasComponent implements OnInit {
  recetas: Receta[] = [];
  loading = true;
  editingReceta: Receta | null = null;
  showModal = false;
  detalleReceta: RecetaMedicamento[] | null = null;
  showDetalle = false;
  detalleTitulo = '';

  constructor(
    private apiService: ApiService,
    private recetasDataService: RecetasDataService
  ) { }

  ngOnInit(): void {
    this.loadAllData();
  }

  async loadAllData(): Promise<void> {
    try {
      // ✅ OPTIMIZACIÓN: Cargar datos principales Y estáticos EN PARALELO
      const [recetasData] = await Promise.all([
        this.apiService.getRecetas(),
        this.recetasDataService.loadStaticData() // Se ejecuta en paralelo, no bloquea
      ]);

      // Mostrar las recetas inmediatamente
      this.recetas = recetasData;
      this.loading = false;
    } catch (error) {
      console.error('Error al cargar datos:', error);
      this.loading = false;
    }
  }

  // Métodos para obtener nombres
  getPacienteNombre(id_paciente: number): string {
    return this.recetasDataService.getPacienteNombre(id_paciente);
  }

  getMedicoNombre(id_medico: number): string {
    return this.recetasDataService.getMedicoNombre(id_medico);
  }

  getMedicamentoNombre(id_medicamento: number): string {
    return this.recetasDataService.getMedicamentoNombre(id_medicamento);
  }

  formatFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-CL');
  }

  openCreateModal(): void {
    this.editingReceta = null;
    this.showModal = true;
  }

  closeModal(): void {
    this.editingReceta = null;
    this.showModal = false;
  }

  saveReceta(receta: Receta): void {
    this.recetas = [...this.recetas, receta];
    this.closeModal();
  }

  updateReceta(receta: Receta): void {
    const index = this.recetas.findIndex(r => r.id_receta === receta.id_receta);
    const updatedRecetas = [...this.recetas];
    updatedRecetas[index] = receta;
    this.recetas = updatedRecetas;
    this.closeModal();
  }

  async handleVerDetalle(receta: Receta): Promise<void> {
    try {
      const response = await this.recetasDataService.getRecMedByReceta(receta.id_receta);
      
      // Asegurar que siempre sea un array
      let items: RecetaMedicamento[];
      if (Array.isArray(response)) {
        items = response;
      } else if (response) {
        items = [response];
      } else {
        items = [];
      }
      
      this.detalleReceta = items;
      this.detalleTitulo = `Detalle de receta #${receta.id_receta} (${items.length} medicamento${items.length !== 1 ? 's' : ''})`;
      this.showDetalle = true;
    } catch (error) {
      console.error('Error al cargar detalle:', error);
      alert('Error al cargar el detalle de la receta');
    }
  }

  handleCerrarDetalle(): void {
    this.showDetalle = false;
    this.detalleReceta = null;
    this.detalleTitulo = '';
  }
}
