// Interface principal de Paciente
export interface Paciente {
    id_paciente: number;
    direccion: string;
    rut: string;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    fecha_nacimiento: string;
    genero: string;
    telefono: string;
}
