import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Familia } from './familia.entity';
import { TipoRelacion } from './tipo-relacion.entity';
import { Paciente } from './paciente.entity';

@Entity('miembro_familiar')
export class MiembroFamiliar {
  @PrimaryGeneratedColumn()
  id_miembro_familiar: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ type: 'date', nullable: true })
  fecha_nacimiento: Date;

  @Column({ length: 1, nullable: true })
  genero: string;

  @ManyToOne(() => Familia)
  @JoinColumn({ name: 'id_familia' })
  familia: Familia;

  @Column({ nullable: false })
  id_familia: number;

  @ManyToOne(() => TipoRelacion)
  @JoinColumn({ name: 'id_tipo_relacion' })
  tipo_relacion: TipoRelacion;

  @Column({ nullable: false })
  id_tipo_relacion: number;

  @ManyToOne(() => Paciente)
  @JoinColumn({ name: 'id_paciente' })
  paciente: Paciente;

  @Column({ nullable: false })
  id_paciente: number;
}
