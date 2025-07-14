import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import {
    Paciente,
    ProgramaSaludOral,
    CentroSalud,
    Usuario,
    PacienteSelect,
    ProgramaSelect,
    CentroSelect,
    UsuarioSelect
} from '../fichas-odontologica/fichas-odontologica.interfaces';

@Injectable({
    providedIn: 'root'
})
export class FichasOdontologicaDataService {
    private pacientes: Paciente[] = [];
    private programas: ProgramaSaludOral[] = [];
    private centros: CentroSalud[] = [];
    private usuarios: Usuario[] = [];
    private isLoaded = false;

    constructor(private apiService: ApiService) { }

    async loadStaticData(): Promise<void> {
        if (this.isLoaded) return;

        try {
            const [pacientesData, programasData, centrosData, usuariosData] = await Promise.all([
                this.apiService.getPacientes(),
                this.apiService.getProgramasSaludOral(),
                this.apiService.getCentrosSalud(),
                this.apiService.getUsuarios()
            ]);

            this.pacientes = pacientesData;
            this.programas = programasData;
            this.centros = centrosData;
            this.usuarios = usuariosData;
            this.isLoaded = true;
        } catch (error) {
            console.error('Error cargando datos estáticos para fichas odontológicas:', error);
        }
    }

    // Getters para mostrar nombres en las tablas
    getPacienteNombre(id: number): string {
        const paciente = this.pacientes.find(p => Number(p.id_paciente) === Number(id));
        return paciente ? `${paciente.nombre} ${paciente.apellido_paterno} ${paciente.apellido_materno}` : id.toString();
    }

    getProgramaNombre(id: number): string {
        const programa = this.programas.find(p => Number(p.id_programa_salud_oral) === Number(id));
        return programa ? programa.nombre : id.toString();
    }

    getCentroNombre(id: number): string {
        const centro = this.centros.find(c => Number(c.id_centro_salud) === Number(id));
        return centro ? centro.nombre : id.toString();
    }

    getUsuarioNombre(id: number): string {
        const usuario = this.usuarios.find(u => Number(u.id_usuario) === Number(id));
        return usuario ? usuario.nombre : id.toString();
    }

    // Getters para selectores en formularios (solo ID y nombre)
    getPacientesForSelect(): PacienteSelect[] {
        return this.pacientes.map(p => ({
            id: p.id_paciente,
            nombre: `${p.nombre} ${p.apellido_paterno} ${p.apellido_materno}`
        }));
    }

    getProgramasForSelect(): ProgramaSelect[] {
        return this.programas.map(p => ({
            id: p.id_programa_salud_oral,
            nombre: p.nombre
        }));
    }

    getCentrosForSelect(): CentroSelect[] {
        return this.centros.map(c => ({
            id: c.id_centro_salud,
            nombre: c.nombre
        }));
    }

    getUsuariosForSelect(): UsuarioSelect[] {
        return this.usuarios.map(u => ({
            id: u.id_usuario,
            nombre: u.nombre
        }));
    }

    // Método para refrescar datos si es necesario
    async refreshData(): Promise<void> {
        this.isLoaded = false;
        await this.loadStaticData();
    }
}
