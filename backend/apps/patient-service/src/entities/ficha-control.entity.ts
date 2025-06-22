import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Paciente } from './paciente.entity';
import { ProgramaControl } from './programa-control.entity';

@Entity('ficha_control')
export class FichaControl {
  @PrimaryGeneratedColumn()
  id_ficha_control: number;

  @Column({ type: 'date' })
  fecha_control: Date;

  @Column({ type: 'text', nullable: true })
  observacion: string;

  @ManyToOne(() => Paciente)
  @JoinColumn({ name: 'id_paciente' })
  paciente: Paciente;

  @Column({ nullable: false })
  id_paciente: number;

  @ManyToOne(() => ProgramaControl)
  @JoinColumn({ name: 'id_programa_control' })
  programa_control: ProgramaControl;

  @Column({ nullable: false })
  id_programa_control: number;

  @Column()
  id_centro_salud: number;

  @Column()
  id_usuario_responsable: number;
}
