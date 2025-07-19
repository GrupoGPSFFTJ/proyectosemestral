import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Injectable({
    providedIn: 'root'
})
export class PacientesDataService {
    private isLoaded = false;
    private loadingPromise: Promise<void> | null = null;

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

            // Aquí se pueden cargar datos estáticos si es necesario
            // Por ejemplo: centros de salud, géneros, etc.
            // await this.apiService.getCentrosSalud();

            this.isLoaded = true;
            this.loadingPromise = null;
        } catch (error) {
            console.error('❌ [PacientesDataService] Error cargando datos estáticos:', error);
            this.loadingPromise = null;
            throw error;
        }
    }
}
