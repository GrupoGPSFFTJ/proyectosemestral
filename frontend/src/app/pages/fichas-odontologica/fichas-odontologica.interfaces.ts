// Interface principal de FichaOdontologica
export interface FichaOdontologica {
    id_ficha_odontologica: number;
    fecha_control: string;
    observacion: string;
    id_paciente: number;
    id_programa_salud_oral: number;
    id_centro_salud: number;
    id_usuario_responsable: number;
}

// Interfaces para entidades relacionadas
export interface Paciente {
    id_paciente: number;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
}

export interface ProgramaSaludOral {
    id_programa_salud_oral: number;
    nombre: string;
}

export interface CentroSalud {
    id_centro_salud: number;
    nombre: string;
}

export interface Usuario {
    id_usuario: number;
    nombre: string;
}

// Interfaces para selectores (solo ID y nombre)
export interface PacienteSelect {
    id: number;
    nombre: string;
}

export interface ProgramaSelect {
    id: number;
    nombre: string;
}

export interface CentroSelect {
    id: number;
    nombre: string;
}

export interface UsuarioSelect {
    id: number;
    nombre: string;
}
