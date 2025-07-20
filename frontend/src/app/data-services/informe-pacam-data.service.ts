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
    const [informes, programasNutricionales] = await Promise.all([
      this.apiService.getInformesPacam(),
      this.apiService.getProgramasNutricionales()
    ]);
    this.informes = informes;
    this.programasNutricionales = programasNutricionales;
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
