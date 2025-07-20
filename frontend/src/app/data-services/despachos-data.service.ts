import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { RecetaMedicamento, Medicamento } from '../pages/despachos/despachos.interfaces';

@Injectable({
    providedIn: 'root'
})
export class DespachosDataService {
    private recetaMedicamentos: RecetaMedicamento[] = [];
    private medicamentos: Medicamento[] = [];
    private isLoaded = false;

    constructor(private apiService: ApiService) { }

    async loadStaticData(): Promise<void> {
        if (this.isLoaded) return;

        try {
            const [recetaMedicamentosData, medicamentosData] = await Promise.all([
                this.apiService.getRecetaMedicamentos(),
                this.apiService.getMedicamentos()
            ]);

            this.recetaMedicamentos = recetaMedicamentosData;
            this.medicamentos = medicamentosData;
            this.isLoaded = true;
        } catch (error) {
            console.error('Error cargando datos estáticos para despachos:', error);
        }
    }

    // Getter para mostrar nombre del medicamento en las tablas
    getNombreMedicamento(id_receta_med: number): string {
        const recetaMed = this.recetaMedicamentos.find(rm => Number(rm.id_receta_medicamento) === Number(id_receta_med));
        if (!recetaMed) return id_receta_med.toString();

        const medicamento = this.medicamentos.find(m => Number(m.id_medicamento) === Number(recetaMed.id_medicamento));
        return medicamento ? medicamento.nombre : id_receta_med.toString();
    }

    // Método para refrescar datos si es necesario
    async refreshData(): Promise<void> {
        this.isLoaded = false;
        await this.loadStaticData();
    }
}
