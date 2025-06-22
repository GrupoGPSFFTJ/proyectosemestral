import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProgramaNutricional } from './programa-nutricional.entity';

@Entity('inscripcion_pacam')
export class InscripcionPacam {
  @PrimaryGeneratedColumn({ name: 'id_inscripcion_pacam' })
  id_inscripcion_pacam: number;

  @Column({ name: 'fecha_inscripcion', type: 'date', nullable: false })
  fecha_inscripcion: Date;

  @Column({ name: 'estado', type: 'char', length: 1, nullable: false })
  estado: string;

  @Column({ name: 'id_paciente', type: 'int', nullable: true })
  id_paciente: number | null;

  @Column({ name: 'id_centro_salud', type: 'int', nullable: false })
  id_centro_salud: number;

  @ManyToOne(() => ProgramaNutricional, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'id_programa_nutricional' })
  id_programa_nutricional: ProgramaNutricional;
}
