export interface InscripcionPacam {
  id_inscripcion_pacam: number;
  fecha_inscripcion: string; // ISO date string
  estado: string;
  id_paciente: number | null;
  id_centro_salud: number;
  id_programa_nutricional: number;
}
