import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { FamiliasDataService } from '../../data-services/familias-data.service';
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
    editingFamilia: Familia | null = null;
    showModal = false;

    constructor(
        private apiService: ApiService,
        private familiasDataService: FamiliasDataService
    ) { }

    ngOnInit(): void {
        this.loadFamilias();
    }

    async loadFamilias(): Promise<void> {
        try {
            await this.familiasDataService.loadStaticData();

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

    openCreateModal(): void {
        this.editingFamilia = null;
        this.showModal = true;
    }

    openEditModal(familia: Familia): void {
        this.editingFamilia = familia;
        this.showModal = true;
    }

    closeModal(): void {
        this.editingFamilia = null;
        this.showModal = false;
    }

    saveFamilia(familia: Familia): void {
        this.familias = [...this.familias, familia];
        this.closeModal();
    }

    updateFamilia(familia: Familia): void {
        const index = this.familias.findIndex(f => f.id_familia === familia.id_familia);
        const updatedFamilias = [...this.familias];
        updatedFamilias[index] = familia;
        this.familias = updatedFamilias;
        this.closeModal();
    }

    formatDate(dateString: string): string {
        if (!dateString) return '';
        const [year, month, day] = dateString.split('-').map(Number);
        if (!year || !month || !day) return dateString;
        const date = new Date(year, month - 1, day);
        return date.toLocaleDateString('es-CL');
    }
}
