import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import {
    Paciente,
    Usuario,
    CentroSalud,
    CitaEstado,
    TipoCita,
    PacienteSelect,
    UsuarioSelect,
    CentroSelect
} from '../pages/citas/citas.interfaces';

@Injectable({
    providedIn: 'root'
})
export class CitasDataService {
    private pacientes: Paciente[] = [];
    private usuarios: Usuario[] = [];
    private centros: CentroSalud[] = [];
    private citaEstados: CitaEstado[] = [];
    private tiposCita: TipoCita[] = [];
    private isLoaded = false;
    private loadingPromise: Promise<void> | null = null;

    constructor(private apiService: ApiService) { }

    async loadStaticData(): Promise<void> {
        if (this.isLoaded) return;
        if (this.loadingPromise) return this.loadingPromise;

        this.loadingPromise = this._loadData();
        return this.loadingPromise;
    }

    private async _loadData(): Promise<void> {
        try {
            const [pacientesData, usuariosData, centrosData, estadosData, tiposData] = await Promise.all([
                this.apiService.getPacientes(),
                this.apiService.getUsuarios(),
                this.apiService.getCentrosSalud(),
                this.apiService.getCitaEstado(),
                this.apiService.getTipoCita()
            ]);

            this.pacientes = pacientesData;
            this.usuarios = usuariosData;
            this.centros = centrosData;
            this.citaEstados = estadosData.map((e: any) => ({ value: e, label: e }));
            this.tiposCita = tiposData.map((t: any) => ({ value: t, label: t }));
            this.isLoaded = true;
            this.loadingPromise = null;
        } catch (error) {
            console.error('❌ [CitasDataService] Error cargando datos estáticos:', error);
            this.loadingPromise = null;
            throw error;
        }
    }

    getPacienteNombre(id: number): string {
        const paciente = this.pacientes.find(p => Number(p.id_paciente) === Number(id));
        return paciente ? `${paciente.nombre} ${paciente.apellido_paterno} ${paciente.apellido_materno}` : id.toString();
    }

    getUsuarioNombre(id: number): string {
        const usuario = this.usuarios.find(u => Number(u.id_usuario) === Number(id));
        return usuario ? usuario.nombre : id.toString();
    }

    getCentroNombre(id: number): string {
        const centro = this.centros.find(c => Number(c.id_centro_salud) === Number(id));
        return centro ? centro.nombre : id.toString();
    }

    getTipoLabel(tipo_cita: string): string {
        const tipo = this.tiposCita.find(t => t.value === tipo_cita);
        return tipo ? tipo.label : tipo_cita;
    }

    getEstadoLabel(estado: string): string {
        const estadoObj = this.citaEstados.find(e => e.value === estado);
        return estadoObj ? estadoObj.label : estado;
    }

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

    getCentrosForSelect(): CentroSelect[] {
        return this.centros.map(c => ({
            id: c.id_centro_salud,
            nombre: c.nombre
        }));
    }

    getCitaEstados(): CitaEstado[] {
        return this.citaEstados;
    }

    getTiposCita(): TipoCita[] {
        return this.tiposCita;
    }

    async refreshData(): Promise<void> {
        this.isLoaded = false;
        await this.loadStaticData();
    }
}
