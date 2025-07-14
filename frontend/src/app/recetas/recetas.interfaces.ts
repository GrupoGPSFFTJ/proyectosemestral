// Interfaces principales
export interface Receta {
    id_receta: number;
    id_paciente: number;
    id_medico: number;
    fecha_emision: string;
    indicacion: string;
}

export interface RecetaMedicamento {
    id_receta_medicamento: number;
    dosis: string;
    frecuencia: string;
    duracion_dias: number;
    id_receta: number;
    id_medicamento: number;
}

export interface RecetaMedicamentoForm {
    id_medicamento: string;
    dosis_cantidad: string;
    dosis_unidad: string;
    frecuencia_horas: string;
    duracion_dias: string;
}

// Interfaces para entidades relacionadas
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

export interface Medicamento {
    id_medicamento: number;
    nombre: string;
}

// Interfaces para selectores (solo ID y nombre)
export interface PacienteSelect {
    id: number;
    nombre: string;
}

export interface UsuarioSelect {
    id: number;
    nombre: string;
}

export interface MedicamentoSelect {
    id: number;
    nombre: string;
}
