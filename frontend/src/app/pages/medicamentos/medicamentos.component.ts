import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { MedicamentosDataService } from '../../data-services/medicamentos-data.service';
import { Medicamento } from './medicamentos.interfaces';

@Component({
  selector: 'app-medicamentos',
  standalone: false,
  templateUrl: './medicamentos.component.html',
  styleUrl: './medicamentos.component.css'
})
export class MedicamentosComponent implements OnInit {
  medicamentos: Medicamento[] = [];
  loading = true;
  editingMedicamento: Medicamento | null = null;
  showModal = false;

  constructor(
    private apiService: ApiService,
    private medicamentosDataService: MedicamentosDataService
  ) { }

  ngOnInit(): void {
    this.loadMedicamentos();
  }

  async loadMedicamentos(): Promise<void> {
    try {
      // ✅ OPTIMIZACIÓN: Cargar datos principales Y estáticos EN PARALELO
      const [medicamentosData] = await Promise.all([
        this.apiService.getMedicamentos(),
        this.medicamentosDataService.loadStaticData() // Se ejecuta en paralelo, no bloquea
      ]);

      // Mostrar los medicamentos inmediatamente
      this.medicamentos = medicamentosData;
      this.loading = false;
    } catch (error) {
      console.error('Error al cargar medicamentos:', error);
      this.loading = false;
    }
  }

  openCreateModal(): void {
    this.editingMedicamento = null;
    this.showModal = true;
  }

  openEditModal(medicamento: Medicamento): void {
    this.editingMedicamento = medicamento;
    this.showModal = true;
  }

  closeModal(): void {
    this.editingMedicamento = null;
    this.showModal = false;
  }

  saveMedicamento(medicamento: Medicamento): void {
    this.medicamentos = [...this.medicamentos, medicamento];
    this.closeModal();
  }

  updateMedicamento(medicamento: Medicamento): void {
    const index = this.medicamentos.findIndex(m => m.id_medicamento === medicamento.id_medicamento);
    const updatedMedicamentos = [...this.medicamentos];
    updatedMedicamentos[index] = medicamento;
    this.medicamentos = updatedMedicamentos;
    this.closeModal();
  }
}
