import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProgramaSaludOral } from './programa-salud-oral.entity';

@Entity('ficha_odontologica')
export class FichaOdontologica {
  @PrimaryGeneratedColumn({ name: 'id_ficha_odontologica' })
  id_ficha_odontologica: number;

  @Column({ name: 'fecha_control', type: 'date', nullable: false })
  fecha_control: Date;

  @Column({ name: 'observacion', type: 'text', nullable: true })
  observacion: string | null;

  @Column({ name: 'id_paciente', type: 'int', nullable: false })
  id_paciente: number;

  @Column({ name: 'id_centro_salud', type: 'int', nullable: false })
  id_centro_salud: number;

  @Column({ name: 'id_usuario_responsable', type: 'int', nullable: false })
  id_usuario_responsable: number;

  @ManyToOne(() => ProgramaSaludOral, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'id_programa_salud_oral' })
  programa_salud_oral: ProgramaSaludOral;

  @Column({ nullable: false })
  id_programa_salud_oral: number;
}
