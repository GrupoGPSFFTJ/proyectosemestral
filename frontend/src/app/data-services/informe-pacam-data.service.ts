import { Injectable } from '@angular/core';
import { InformePacam } from '../pages/pacam/informes/informe-pacam.interface';
import { ApiService } from '../../services/api.service';

@Injectable({ providedIn: 'root' })
export class InformePacamDataService {
  private informes: InformePacam[] = [];
  private programasNutricionales: any[] = [];
  private isLoaded = false;

  constructor(private apiService: ApiService) {}

  async loadStaticData(): Promise<void> {
    if (this.isLoaded) return;
    this.informes = await this.apiService.getInformesPacam();
    // Para los programas nutricionales, usaremos IDs genéricos por ahora
    this.programasNutricionales = [
      { id_programa_nutricional: 1, nombre: 'Programa Infantil' },
      { id_programa_nutricional: 2, nombre: 'Programa Adulto Mayor' },
      { id_programa_nutricional: 3, nombre: 'Programa Materno' }
    ];
    this.isLoaded = true;
  }

  getInformes(): InformePacam[] {
    return this.informes;
  }

  getInformeLabel(id: number): string {
    const programa = this.programasNutricionales.find(p => p.id_programa_nutricional === id);
    return programa ? programa.nombre : `Programa ${id}`;
  }

  getProgramasNutricionalesForSelect(): Array<{id: number, nombre: string}> {
    return this.programasNutricionales.map(programa => ({
      id: programa.id_programa_nutricional,
      nombre: programa.nombre
    }));
  }

  async refreshData(): Promise<void> {
    this.isLoaded = false;
    await this.loadStaticData();
  }
}
