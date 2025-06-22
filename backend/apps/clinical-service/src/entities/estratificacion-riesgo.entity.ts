import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'estratificacion_riesgo' })
export class EstratificacionRiesgo {
  @PrimaryGeneratedColumn({ name: 'id_estratificacion_riesgo' })
  idEstratificacionRiesgo: number;

  @Column({ type: 'varchar', length: 20, name: 'nivel_riesgo' })
  nivelRiesgo: string;

  @Column({ type: 'varchar', length: 255, name: 'motivo' })
  motivo: string;

  @Column({ type: 'date', name: 'fecha_asignacion' })
  fechaAsignacion: Date;

  @Column({ type: 'int', name: 'id_paciente' })
  idPaciente: number;

  @Column({ type: 'int', name: 'usuario_responsable' })
  usuarioResponsable: number;
}
