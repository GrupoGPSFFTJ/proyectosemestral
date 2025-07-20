import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Paciente } from './pacientes.interfaces';

@Component({
    selector: 'app-pacientes',
    standalone: false,
    templateUrl: './pacientes.component.html',
    styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {
    pacientes: Paciente[] = [];
    error: string | null = null;
    editingPaciente: Paciente | null = null;
    showForm = false;
    loading = false;

    constructor(
        private apiService: ApiService,
    ) { }

    async ngOnInit(): Promise<void> {
        await this.loadAllData();
    }

    async loadAllData(): Promise<void> {
        try {
            this.loading = true;

            this.pacientes = await this.apiService.getPacientes();
            this.loading = false;
        } catch (error) {
            console.error('❌ [PacientesComponent] Error al cargar datos:', error);
            this.loading = false;
            this.error = 'Error al cargar los pacientes';
            // En caso de error, mostrar array vacío
            this.pacientes = [];
        }
    }



    capitalizeWords(str: string): string {
        return str.replace(/\b\w+/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase());
    }


    formatFecha(dateString: string): string {
        return new Date(dateString).toLocaleDateString('es-CL');
    }

    // Nuevos métodos siguiendo el patrón de modal
    openCreateModal(): void {
        this.editingPaciente = null;
        this.showForm = true;
    }

    openEditModal(paciente: Paciente): void {
        this.editingPaciente = paciente;
        this.showForm = true;
    }

    closeModal(): void {
        this.editingPaciente = null;
        this.showForm = false;
    }

    savePaciente(paciente: Paciente): void {
        this.pacientes = [...this.pacientes, paciente];
        this.closeModal();
    }

    updatePaciente(paciente: Paciente): void {
        const index = this.pacientes.findIndex(p => p.id_paciente === paciente.id_paciente);
        const updatedPacientes = [...this.pacientes];
        updatedPacientes[index] = paciente;
        this.pacientes = updatedPacientes;
        this.closeModal();
    }

    async handleDelete(id: number): Promise<void> {
        if (!confirm('¿Seguro que deseas eliminar este paciente?')) return;

        try {
            await this.apiService.deletePaciente(id);
            this.pacientes = this.pacientes.filter(p => p.id_paciente !== id);
        } catch (err: any) {
            this.error = err.message;
        }
    }
}
