export interface ControlDesembolso {
  id_control_desembolso: number;
  fecha_entrega: string; // ISO date string
  cantidad_entregada: number;
  id_inscripcion_pacam: number;
}
