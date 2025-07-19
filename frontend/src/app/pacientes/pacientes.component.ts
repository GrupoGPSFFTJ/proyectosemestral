import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { PacientesDataService } from '../data-services/pacientes-data.service';
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
    search = '';
    loading = false;

    constructor(
        private apiService: ApiService,
        private pacientesDataService: PacientesDataService
    ) { }

    async ngOnInit(): Promise<void> {
        await this.loadAllData();
    }

    async loadAllData(): Promise<void> {
        try {
            this.loading = true;

            // ✅ OPTIMIZACIÓN: Cargar datos principales Y estáticos EN PARALELO
            const [pacientesData] = await Promise.all([
                this.apiService.getPacientes(),
                this.pacientesDataService.loadStaticData() // Se ejecuta en paralelo, no bloquea
            ]);

            // Mostrar los pacientes inmediatamente
            this.pacientes = pacientesData;
            this.loading = false;
        } catch (error) {
            console.error('❌ [PacientesComponent] Error al cargar datos:', error);
            this.loading = false;
            this.error = 'Error al cargar los pacientes';
            // En caso de error, mostrar array vacío
            this.pacientes = [];
        }
    }

    get filteredPacientes(): Paciente[] {
        const q = this.search.trim().toLowerCase();
        if (!q) return this.pacientes;

        return this.pacientes.filter(p =>
            p.nombre.toLowerCase().includes(q) ||
            p.apellido_paterno.toLowerCase().includes(q) ||
            p.apellido_materno.toLowerCase().includes(q) ||
            p.rut.toLowerCase().includes(q) ||
            p.telefono.toLowerCase().includes(q) ||
            p.direccion.toLowerCase().includes(q)
        );
    }

    handleEdit(paciente: Paciente): void {
        this.editingPaciente = paciente;
        this.showForm = true;
    }

    openForm(): void {
        this.editingPaciente = null;
        this.showForm = true;
    }

    onFormClose(updated: boolean = false): void {
        this.editingPaciente = null;
        this.showForm = false;
        if (updated) {
            this.loadAllData();
        }
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
        this.pacientes = [...this.pacientes, paciente].sort((a, b) => a.id_paciente - b.id_paciente);
        this.closeModal();
    }

    updatePaciente(paciente: Paciente): void {
        const index = this.pacientes.findIndex(p => p.id_paciente === paciente.id_paciente);
        const updatedPacientes = [...this.pacientes];
        updatedPacientes[index] = paciente;
        this.pacientes = updatedPacientes.sort((a, b) => a.id_paciente - b.id_paciente);
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

    capitalizeWords(str: string): string {
        return str.replace(/\b\w+/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase());
    }

    getInitials(paciente: Paciente): string {
        return `${paciente.nombre?.[0] || ''}${paciente.apellido_paterno?.[0] || ''}`.toUpperCase();
    }

    formatDate(dateString: string): string {
        return new Date(dateString).toLocaleDateString('es-CL');
    }
}
