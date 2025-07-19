import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Injectable({
    providedIn: 'root'
})
export class PacientesDataService {
    private isLoaded = false;
    private loadingPromise: Promise<void> | null = null;
    private generos: Array<{ value: string, label: string }> = [];

    constructor(private apiService: ApiService) { }

    async loadStaticData(): Promise<void> {
        // ✅ LAZY LOADING: Evita cargas múltiples concurrentes
        if (this.isLoaded) return;
        if (this.loadingPromise) return this.loadingPromise;

        this.loadingPromise = this._loadData();
        return this.loadingPromise;
    }

    private async _loadData(): Promise<void> {
        try {
            // Obtiene los géneros desde la API
            const generosApi = await this.apiService.getGeneros();
            this.generos = (generosApi || []).map((g: string) => ({ value: g, label: g }));

            this.isLoaded = true;
            this.loadingPromise = null;
        } catch (error) {
            console.error('❌ [PacientesDataService] Error cargando datos estáticos:', error);
            this.loadingPromise = null;
            throw error;
        }
    }

    getGeneros(): Array<{ value: string, label: string }> {
        return this.generos;
    }
}
