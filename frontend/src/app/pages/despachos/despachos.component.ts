import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { DespachosDataService } from '../../data-services/despachos-data.service';
import { Despacho } from './despachos.interfaces';

@Component({
  selector: 'app-despachos',
  standalone: false,
  templateUrl: './despachos.component.html',
  styleUrl: './despachos.component.css'
})
export class DespachosComponent implements OnInit {
  despachos: Despacho[] = [];
  loading = true;

  constructor(
    private apiService: ApiService,
    private despachosDataService: DespachosDataService
  ) { }

  ngOnInit(): void {
    this.loadAllData();
  }

  async loadAllData(): Promise<void> {
    try {
      const [despachosData] = await Promise.all([
        this.apiService.getDespachos(),
        this.despachosDataService.loadStaticData()
      ]);

      this.despachos = despachosData;
      this.loading = false;
    } catch (error) {
      console.error('Error al cargar datos:', error);
      this.loading = false;
    }
  }

  getNombreMedicamento(id_receta_med: number): string {
    return this.despachosDataService.getNombreMedicamento(id_receta_med);
  }

  formatDate(dateString: string): string {
    return dateString ? new Date(dateString).toLocaleDateString('es-CL') : '';
  }
}
