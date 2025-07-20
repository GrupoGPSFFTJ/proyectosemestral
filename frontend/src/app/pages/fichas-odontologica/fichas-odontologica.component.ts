
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { FichasOdontologicaDataService } from '../../data-services/fichas-odontologica-data.service';
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
  editingFicha: FichaOdontologica | null = null;
  showModal = false;

  constructor(
    private apiService: ApiService,
    private fichasOdontologicaDataService: FichasOdontologicaDataService
  ) { }

  ngOnInit(): void {
    this.loadAllData();
  }

  async loadAllData(): Promise<void> {
    try {
      await this.fichasOdontologicaDataService.loadStaticData();
      this.fichasOdontologicas = await this.apiService.getFichasOdonto();
      this.loading = false;
    } catch (error) {
      console.error('Error al cargar datos:', error);
      this.loading = false;
    }
  }

  openCreateModal(): void {
    this.editingFicha = null;
    this.showModal = true;
  }

  openEditModal(ficha: FichaOdontologica): void {
    this.editingFicha = ficha;
    this.showModal = true;
  }

  closeModal(): void {
    this.editingFicha = null;
    this.showModal = false;
  }

  async saveFicha(ficha: FichaOdontologica) {
    await this.apiService.createFichaOdonto(ficha);
    alert('Ficha odontológica creada correctamente');
    await this.loadAllData();
    this.closeModal();
  }

  async updateFicha(ficha: FichaOdontologica) {
    await this.apiService.updateFichaOdonto(ficha.id_ficha_odontologica, ficha);
    alert('Ficha odontológica actualizada correctamente');
    await this.loadAllData();
    this.closeModal();
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

  formatFecha(dateString: string): string {
    return new Date(dateString).toLocaleDateString('es-CL');
  }
}
