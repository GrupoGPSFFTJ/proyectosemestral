import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Vacuna } from './vacuna.entity';

@Entity('calendario_vacuna')
export class CalendarioVacuna {
  @PrimaryGeneratedColumn({ name: 'id_calendario_vacuna' })
  id_calendario_vacuna: number;

  @Column({ name: 'edad_recomendada', type: 'int', nullable: false })
  edad_recomendada: number;

  @Column({ name: 'dosis', type: 'int', nullable: false })
  dosis: number;

  @Column({ name: 'etapa', type: 'varchar', length: 50, nullable: true })
  etapa: string | null;

  @ManyToOne(() => Vacuna)
  @JoinColumn({ name: 'id_vacuna' })
  vacuna: Vacuna;

  @Column({ nullable: false })
  id_vacuna: number;
}
