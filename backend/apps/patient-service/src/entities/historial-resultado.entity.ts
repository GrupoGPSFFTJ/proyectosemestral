import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FichaControl } from './ficha-control.entity';

@Entity('historial_resultado')
export class HistorialResultado {
  @PrimaryGeneratedColumn()
  id_historial_resultado: number;

  @Column({ type: 'date' })
  fecha_registro: Date;

  @Column({ type: 'int', nullable: true })
  presion_sistolica: number;

  @Column({ type: 'int', nullable: true })
  presion_diastolica: number;

  @Column({ type: 'int', nullable: true })
  frecuencia_cardiaca: number;

  @Column({ type: 'numeric', precision: 5, scale: 2, nullable: true })
  glicemia: number;

  @Column({ type: 'numeric', precision: 5, scale: 2, nullable: true })
  peso: number;

  @Column({ type: 'numeric', precision: 4, scale: 2, nullable: true })
  talla: number;

  @Column({ type: 'numeric', precision: 4, scale: 2, nullable: true })
  imc: number;

  @Column({ type: 'text', nullable: true })
  observacion: string;

  @ManyToOne(() => FichaControl)
  @JoinColumn({ name: 'id_ficha_control' })
  ficha_control: FichaControl;

  @Column({ nullable: false })
  id_ficha_control: number;
}
