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

    // Getter para mostrar nombre de la familia
    getFamiliaNombre(id: number): string {
        const familia = this.familias.find(f => Number(f.id_familia) === Number(id));
        return familia ? familia.nombre : id.toString();
    }

    // Getter para selector en formularios (solo ID y nombre)
    getFamiliasForSelect(): FamiliaSelect[] {
        return this.familias.map(f => ({
            id: f.id_familia,
            nombre: f.nombre
        }));
    }

    // Getter para obtener todas las familias (para la tabla principal)
    getAllFamilias(): any[] {
        return this.familias;
    }

    // Método para refrescar datos después de crear/actualizar/eliminar
    async refreshData(): Promise<void> {
        this.isLoaded = false;
        await this.loadStaticData();
    }
}
