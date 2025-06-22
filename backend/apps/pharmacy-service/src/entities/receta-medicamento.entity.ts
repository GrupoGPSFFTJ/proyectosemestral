import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Receta } from './receta.entity';
import { Medicamento } from './medicamento.entity';

@Entity('receta_medicamento')
export class RecetaMedicamento {
  @PrimaryGeneratedColumn({ name: 'id_receta_medicamento' })
  id_receta_medicamento: number;

  @Column({ name: 'dosis', type: 'varchar', length: 50, nullable: false })
  dosis: string;

  @Column({ name: 'frecuencia', type: 'varchar', length: 50, nullable: false })
  frecuencia: string;

  @Column({ name: 'duracion_dias', type: 'int', nullable: false })
  duracion_dias: number;

  @ManyToOne(() => Receta)
  @JoinColumn({ name: 'id_receta' })
  receta: Receta;

  @Column({ nullable: false })
  id_receta: number;

  @ManyToOne(() => Medicamento)
  @JoinColumn({ name: 'id_medicamento' })
  medicamento: Medicamento;

  @Column({ nullable: false })
  id_medicamento: number;
}
