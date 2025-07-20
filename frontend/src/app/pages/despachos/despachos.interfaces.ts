// Interface principal de Despacho
export interface Despacho {
    id_despacho: number;
    fecha_despacho: string;
    cantidad_despachada: string;
    id_receta_med: number;
}

// Interfaces para entidades relacionadas
export interface RecetaMedicamento {
    id_receta_medicamento: number;
    dosis: string;
    frecuencia: string;
    duracion_dias: number;
    id_receta: number;
    id_medicamento: number;
}

export interface Medicamento {
    id_medicamento: number;
    nombre: string;
}
