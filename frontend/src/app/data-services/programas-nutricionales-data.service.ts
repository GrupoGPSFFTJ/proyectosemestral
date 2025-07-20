import { Injectable } from "@angular/core";
import { ApiService } from "../../services/api.service";
import { ProgramasNutricionales } from "../pages/pacam/programas-nutricionales/programas-nutricionales.interface";

export interface ProgramaNutricionalSelect {
    id: number;
    nombre: string;
}

@Injectable({ providedIn: 'root' })
export class ProgramasNutricionalesDataService {
    private programasNutricionales: ProgramasNutricionales[] = [];
    private isLoaded = false;
    private loadingPromise: Promise<void> | null = null;
    
    constructor(private apiService: ApiService) {}
    
    async loadStaticData(): Promise<void> {
        // ✅ LAZY LOADING: Evita cargas múltiples concurrentes
        if (this.isLoaded) return;
        if (this.loadingPromise) return this.loadingPromise;

        this.loadingPromise = this._loadData();
        return this.loadingPromise;
    }

    private async _loadData(): Promise<void> {
        try {
            this.programasNutricionales = await this.apiService.getProgramasNutricionales();
            this.isLoaded = true;
            this.loadingPromise = null;
        } catch (error) {
            console.error('❌ [ProgramasNutricionalesDataService] Error cargando datos:', error);
            this.loadingPromise = null;
            throw error;
        }
    }
    
    getProgramasNutricionales(): ProgramasNutricionales[] {
        return this.programasNutricionales;
    }
    
    // Getter para mostrar nombres en las tablas
    getProgramaLabel(id_programa_nutricional: number): string {
        const programa = this.programasNutricionales.find(p => p.id_programa_nutricional === id_programa_nutricional);
        return programa ? programa.nombre : `Programa ${id_programa_nutricional}`;
    }

    // Getter para selectores en formularios
    getProgramasForSelect(): ProgramaNutricionalSelect[] {
        return this.programasNutricionales.map(p => ({
            id: p.id_programa_nutricional,
            nombre: p.nombre
        }));
    }

    // Método para refrescar datos si es necesario
    async refreshData(): Promise<void> {
        this.isLoaded = false;
        this.loadingPromise = null;
        await this.loadStaticData();
    }
}