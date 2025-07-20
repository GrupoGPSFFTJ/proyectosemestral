// Interface principal de FichaClinica
export interface FichaClinica {
    id_ficha_control: number;
    fecha_control: string;
    observacion: string;
    id_paciente: number;
    id_programa_control: number;
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

export interface Programa {
    id_programa_control: number;
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
