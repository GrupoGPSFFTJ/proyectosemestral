import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum CitaEstado {
  PENDIENTE = 'Pendiente',
  CONFIRMADA = 'Confirmada',
  CANCELADA = 'Cancelada',
  RECHAZADA = 'Rechazada',
  FINALIZADA = 'Finalizada',
  EN_ESPERA = 'En espera',
}

export enum TipoCita {
  CONSULTA_GENERAL = 'Consulta General',
  CONTROL_NUTRICIONAL = 'Control Nutricional',
  ODONTOLOGICA = 'Odontológica',
  VACUNACION = 'Vacunación',
  URGENCIA = 'Urgencia',
  DESPACHO_MEDICAMENTO = 'Despacho Medicamento',
  ESPECIALIDAD = 'Especialidad',
  LABORATORIO = 'Laboratorio',
  DIAGNOSTICO_IMAGEN = 'Diagnóstico Imagen',
  TELEMEDICINA = 'Telemedicina',
  FISIOTERAPIA = 'Fisioterapia',
  VISITA_DOMICILIARIA = 'Visita Domiciliaria',
  PREVENTIVA = 'Preventiva',
  PLANIFICACION_FAMILIAR = 'Planificación Familiar',
  SALUD_MENTAL = 'Salud Mental',
  CUIDADOS_PALIATIVOS = 'Cuidados Paliativos',
}

@Entity({ name: 'cita' })
export class Cita {
  @PrimaryGeneratedColumn()
  id_cita: number;

  @Column({ type: 'timestamp' })
  fecha_hora: Date;

  @Column({
    type: 'enum',
    enum: TipoCita,
    nullable: false,
  })
  tipo_cita: TipoCita;

  @Column({
    type: 'enum',
    enum: CitaEstado,
    default: CitaEstado.PENDIENTE,
  })
  estado: CitaEstado;

  @Column({ type: 'text' })
  observacion: string;

  @Column({ type: 'int' })
  id_paciente: number;

  @Column({ type: 'int' })
  id_usuario: number;

  @Column({ type: 'int' })
  id_centro_salud: number;
}
