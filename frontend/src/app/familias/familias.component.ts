import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FamiliasDataService } from '../data-services/familias-data.service';
import { Familia } from './familias.interfaces';

@Component({
    selector: 'app-familias',
    standalone: false,
    templateUrl: './familias.component.html',
    styleUrls: ['./familias.component.css']
})
export class FamiliasComponent implements OnInit {
    familias: Familia[] = [];
    loading = true;

    constructor(
        private apiService: ApiService,
        private familiasDataService: FamiliasDataService
    ) { }

    ngOnInit(): void {
        this.loadFamilias();
    }

    async loadFamilias(): Promise<void> {
        try {
            // Cargar datos estáticos primero
            await this.familiasDataService.loadStaticData();

            // Luego cargar las familias
            const data = await this.apiService.getFamilias();
            if (Array.isArray(data)) {
                this.familias = data;
            }
            this.loading = false;
        } catch (err) {
            console.error('ApiService familias GET error:', err);
            this.loading = false;
        }
    }

    formatDate(dateString: string): string {
        return new Date(dateString).toLocaleDateString('es-CL');
    }
}
