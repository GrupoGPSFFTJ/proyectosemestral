
export interface Cita {
    id_cita: number;
    observacion: string;
    id_paciente: number;
    id_usuario: number;
    id_centro_salud: number;
    estado: string;
    fecha: string;
    hora: string;
    tipo_cita: string;
}


export interface Paciente {
    id_paciente: number;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
}

export interface Usuario {
    id_usuario: number;
    nombre: string;
}

export interface CentroSalud {
    id_centro_salud: number;
    nombre: string;
}

export interface CitaEstado {
    value: string;
    label: string;
}

export interface TipoCita {
    value: string;
    label: string;
}


export interface PacienteSelect {
    id: number;
    nombre: string;
}

export interface UsuarioSelect {
    id: number;
    nombre: string;
}

export interface CentroSelect {
    id: number;
    nombre: string;
}
