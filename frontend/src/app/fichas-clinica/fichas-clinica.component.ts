import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FichasClinicaDataService } from '../data-services/fichas-clinica-data.service';
import { FichaClinica } from './fichas-clinica.interfaces';

@Component({
  selector: 'app-fichas-clinica',
  standalone: false,
  templateUrl: './fichas-clinica.component.html',
  styleUrl: './fichas-clinica.component.css'
})
export class FichasClinicaComponent implements OnInit {
  fichasClinicas: FichaClinica[] = [];
  loading = true;

  constructor(
    private apiService: ApiService,
    private fichasClinicaDataService: FichasClinicaDataService
  ) { }

  ngOnInit(): void {
    this.loadAllData();
  }

  async loadAllData(): Promise<void> {
    try {
      // Cargar datos estáticos primero
      await this.fichasClinicaDataService.loadStaticData();

      // Luego cargar las fichas clínicas
      this.fichasClinicas = await this.apiService.getFichasControl();
      this.loading = false;
    } catch (error) {
      console.error('Error al cargar datos:', error);
      this.loading = false;
    }
  }

  getPacienteNombre(id_paciente: number): string {
    return this.fichasClinicaDataService.getPacienteNombre(id_paciente);
  }

  getProgramaNombre(id_programa: number): string {
    return this.fichasClinicaDataService.getProgramaNombre(id_programa);
  }

  getCentroNombre(id_centro: number): string {
    return this.fichasClinicaDataService.getCentroNombre(id_centro);
  }

  getUsuarioNombre(id_usuario: number): string {
    return this.fichasClinicaDataService.getUsuarioNombre(id_usuario);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('es-CL');
  }
}
