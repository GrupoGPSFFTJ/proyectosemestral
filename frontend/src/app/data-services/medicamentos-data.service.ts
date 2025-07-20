import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';

// Interface para selector (solo ID y nombre)
interface MedicamentoSelect {
    id: number;
    nombre: string;
}

@Injectable({
    providedIn: 'root'
})
export class MedicamentosDataService {
    private medicamentos: any[] = [];
    private isLoaded = false;

    constructor(private apiService: ApiService) { }

    async loadStaticData(): Promise<void> {
        if (this.isLoaded) return;

        try {
            this.medicamentos = await this.apiService.getMedicamentos();
            this.isLoaded = true;
        } catch (error) {
            console.error('Error cargando datos de medicamentos:', error);
        }
    }

    getMedicamentoNombre(id: number): string {
        const medicamento = this.medicamentos.find(m => Number(m.id_medicamento) === Number(id));
        return medicamento ? medicamento.nombre : id.toString();
    }

    getMedicamentosForSelect(): MedicamentoSelect[] {
        return this.medicamentos.map(m => ({
            id: m.id_medicamento,
            nombre: m.nombre
        }));
    }

    getAllMedicamentos(): any[] {
        return this.medicamentos;
    }

    async refreshData(): Promise<void> {
        this.isLoaded = false;
        await this.loadStaticData();
    }
}
