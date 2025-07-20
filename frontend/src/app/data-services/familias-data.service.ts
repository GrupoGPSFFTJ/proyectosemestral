import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';

// Interface para selector (solo ID y nombre)
interface FamiliaSelect {
    id: number;
    nombre: string;
}

@Injectable({
    providedIn: 'root'
})
export class FamiliasDataService {
    private familias: any[] = [];
    private isLoaded = false;

    constructor(private apiService: ApiService) { }

    async loadStaticData(): Promise<void> {
        if (this.isLoaded) return;

        try {
            this.familias = await this.apiService.getFamilias();
            this.isLoaded = true;
        } catch (error) {
            console.error('Error cargando datos de familias:', error);
        }
    }

    getFamiliaNombre(id: number): string {
        const familia = this.familias.find(f => Number(f.id_familia) === Number(id));
        return familia ? familia.nombre : id.toString();
    }

    getFamiliasForSelect(): FamiliaSelect[] {
        return this.familias.map(f => ({
            id: f.id_familia,
            nombre: f.nombre
        }));
    }

    getAllFamilias(): any[] {
        return this.familias;
    }

    async refreshData(): Promise<void> {
        this.isLoaded = false;
        await this.loadStaticData();
    }
}
