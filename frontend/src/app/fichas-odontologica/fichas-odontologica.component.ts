import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FichasOdontologicaDataService } from '../data-services/fichas-odontologica-data.service';
import { FichaOdontologica } from './fichas-odontologica.interfaces';

@Component({
  selector: 'app-fichas-odontologica',
  standalone: false,
  templateUrl: './fichas-odontologica.component.html',
  styleUrl: './fichas-odontologica.component.css'
})
export class FichasOdontologicaComponent implements OnInit {
  fichasOdontologicas: FichaOdontologica[] = [];
  loading = true;

  constructor(
    private apiService: ApiService,
    private fichasOdontologicaDataService: FichasOdontologicaDataService
  ) { }

  ngOnInit(): void {
    this.loadAllData();
  }

  async loadAllData(): Promise<void> {
    try {
      // Cargar datos estáticos primero
      await this.fichasOdontologicaDataService.loadStaticData();

      // Luego cargar las fichas odontológicas
      this.fichasOdontologicas = await this.apiService.getFichasOdonto();
      this.loading = false;
    } catch (error) {
      console.error('Error al cargar datos:', error);
      this.loading = false;
    }
  }

  getPacienteNombre(id_paciente: number): string {
    return this.fichasOdontologicaDataService.getPacienteNombre(id_paciente);
  }

  getProgramaNombre(id_programa: number): string {
    return this.fichasOdontologicaDataService.getProgramaNombre(id_programa);
  }

  getCentroNombre(id_centro: number): string {
    return this.fichasOdontologicaDataService.getCentroNombre(id_centro);
  }

  getUsuarioNombre(id_usuario: number): string {
    return this.fichasOdontologicaDataService.getUsuarioNombre(id_usuario);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('es-CL');
  }
}
