import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InscripcionPacam } from './inscripcion-pacam.entity';

@Entity('control_desembolso')
export class ControlDesembolso {
  @PrimaryGeneratedColumn({ name: 'id_control_desembolso' })
  id_control_desembolso: number;

  @Column({ name: 'fecha_entrega', type: 'date', nullable: false })
  fecha_entrega: Date;

  @Column({
    name: 'cantidad_entregada',
    type: 'numeric',
    precision: 8,
    scale: 2,
    nullable: false,
  })
  cantidad_entregada: number;

  @ManyToOne(() => InscripcionPacam, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'id_inscripcion_pacam' })
  inscripcion_pacam: InscripcionPacam;

  @Column({ nullable: false })
  id_inscripcion_pacam: number;
}
