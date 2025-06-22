import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RegistroVacunacion } from './registro-vacunacion.entity';

@Entity('alerta_inasistencia')
export class AlertaInasistencia {
  @PrimaryGeneratedColumn({ name: 'id_alerta_inasistencia' })
  id_alerta_inasistencia: number;

  @Column({ name: 'fecha_alerta', type: 'date', nullable: false })
  fecha_alerta: Date;

  @Column({ name: 'motivo', type: 'varchar', length: 255, nullable: false })
  motivo: string;

  @ManyToOne(() => RegistroVacunacion, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'id_registro_vacunacion' })
  registro_vacunacion: RegistroVacunacion;

  @Column({ nullable: false })
  id_registro_vacunacion: number;
}
