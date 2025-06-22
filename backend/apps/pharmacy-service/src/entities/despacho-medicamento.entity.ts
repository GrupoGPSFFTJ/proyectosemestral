import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RecetaMedicamento } from './receta-medicamento.entity';

@Entity('despacho_medicamento')
export class DespachoMedicamento {
  @PrimaryGeneratedColumn({ name: 'id_despacho' })
  id_despacho: number;

  @Column({ name: 'fecha_despacho', type: 'timestamp', nullable: false })
  fecha_despacho: Date;

  @Column({
    name: 'cantidad_despachada',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  cantidad_despachada: string;

  @ManyToOne(() => RecetaMedicamento)
  @JoinColumn({ name: 'id_receta_med' })
  recetaMedicamento: RecetaMedicamento;

  @Column({ nullable: false })
  id_receta_med: number;
}
