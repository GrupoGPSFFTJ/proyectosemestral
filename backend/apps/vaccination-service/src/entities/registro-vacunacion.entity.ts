import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Vacuna } from './vacuna.entity';
import { CalendarioVacuna } from './calendario-vacuna.entity';

@Entity('registro_vacunacion')
export class RegistroVacunacion {
  @PrimaryGeneratedColumn({ name: 'id_registro_vacunacion' })
  id_registro_vacunacion: number;

  @Column({ name: 'fecha_aplicacion', type: 'date', nullable: false })
  fecha_aplicacion: Date;

  @Column({ name: 'lote', type: 'varchar', length: 50, nullable: true })
  lote: string | null;

  @Column({ name: 'id_paciente', type: 'int', nullable: false })
  id_paciente: number;

  @Column({ name: 'id_centro_salud', type: 'int', nullable: false })
  id_centro_salud: number;

  @Column({ name: 'id_usuario_responsable', type: 'int', nullable: false })
  id_usuario_responsable: number;

  @ManyToOne(() => Vacuna, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'id_vacuna' })
  vacuna: Vacuna;

  @Column({ nullable: false })
  id_vacuna: number;

  @ManyToOne(() => CalendarioVacuna, {
    nullable: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'id_calendario_vacuna' })
  calendario_vacuna: CalendarioVacuna | null;

  @Column({ nullable: false })
  id_calendario_vacuna: number | null;
}
