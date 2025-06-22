import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProgramaNutricional } from './programa-nutricional.entity';

@Entity('informe_pacam')
export class InformePacam {
  @PrimaryGeneratedColumn({ name: 'id_informe_pacam' })
  id_informe_pacam: number;

  @Column({ name: 'fecha_informe', type: 'date', nullable: false })
  fecha_informe: Date;

  @Column({ name: 'total_beneficiario', type: 'int', nullable: false })
  total_beneficiario: number;

  @Column({
    name: 'total_desembolso',
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  total_desembolso: number;

  @ManyToOne(() => ProgramaNutricional, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'id_programa_nutricional' })
  programa_nutricional: ProgramaNutricional;

  @Column({ nullable: false })
  id_programa_nutricional: number;
}
