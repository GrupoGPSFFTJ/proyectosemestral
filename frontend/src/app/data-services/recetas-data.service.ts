import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import {
    Paciente,
    Usuario,
    Medicamento,
    PacienteSelect,
    UsuarioSelect,
    MedicamentoSelect,
    RecetaMedicamentoForm,
    RecetaMedicamento
} from '../recetas/recetas.interfaces';

@Injectable({
    providedIn: 'root'
})
export class RecetasDataService {
    private pacientes: Paciente[] = [];
    private usuarios: Usuario[] = [];
    private medicamentos: Medicamento[] = [];
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
            const [pacientesData, usuariosData, medicamentosData] = await Promise.all([
                this.apiService.getPacientes(),
                this.apiService.getUsuarios(),
                this.apiService.getMedicamentos()
            ]);

            this.pacientes = pacientesData;
            this.usuarios = usuariosData;
            this.medicamentos = medicamentosData;
            this.isLoaded = true;
            this.loadingPromise = null;
        } catch (error) {
            console.error('❌ [RecetasDataService] Error cargando datos estáticos:', error);
            this.loadingPromise = null;
            throw error;
        }
    }

    // Getters para mostrar nombres en las tablas
    getPacienteNombre(id: number): string {
        const paciente = this.pacientes.find(p => Number(p.id_paciente) === Number(id));
        return paciente ? `${paciente.nombre} ${paciente.apellido_paterno} ${paciente.apellido_materno}` : id.toString();
    }

    getMedicoNombre(id: number): string {
        const usuario = this.usuarios.find(u => Number(u.id_usuario) === Number(id));
        return usuario ? usuario.nombre : id.toString();
    }

    getMedicamentoNombre(id: number): string {
        const medicamento = this.medicamentos.find(m => Number(m.id_medicamento) === Number(id));
        return medicamento ? medicamento.nombre : id.toString();
    }

    // Getters para selectores en formularios (solo ID y nombre)
    getPacientesForSelect(): PacienteSelect[] {
        return this.pacientes.map(p => ({
            id: p.id_paciente,
            nombre: `${p.nombre} ${p.apellido_paterno} ${p.apellido_materno}`
        }));
    }

    getUsuariosForSelect(): UsuarioSelect[] {
        return this.usuarios.map(u => ({
            id: u.id_usuario,
            nombre: u.nombre
        }));
    }

    getMedicamentosForSelect(): MedicamentoSelect[] {
        return this.medicamentos.map(m => ({
            id: m.id_medicamento,
            nombre: m.nombre
        }));
    }

    // Método para refrescar datos si es necesario
    async refreshData(): Promise<void> {
        this.isLoaded = false;
        await this.loadStaticData();
    }

    getRecMedByReceta(recetaId: number): Promise<RecetaMedicamento[]> {
        return this.apiService.getRecMedByReceta(recetaId);
    }

    async getRecMedByRecetaForForm(recetaId: number): Promise<RecetaMedicamentoForm[]> {
        const recMedData = await this.apiService.getRecMedByReceta(recetaId);
        // Convertir de RecetaMedicamento[] a RecetaMedicamentoForm[]
        return recMedData.map(item => ({
            id_medicamento: item.id_medicamento.toString(),
            dosis_cantidad: item.dosis.split(' ')[0] || '',
            dosis_unidad: item.dosis.split(' ')[1] || '',
            frecuencia_horas: item.frecuencia,
            duracion_dias: item.duracion_dias.toString()
        }));
    }
}
