import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Familia } from './familia.entity';

@Entity('plan_intervencion')
export class PlanIntervencion {
  @PrimaryGeneratedColumn()
  id_plan_intervencion: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 255, nullable: true })
  descripcion: string;

  @Column({ type: 'date', nullable: true })
  fecha_inicio: Date;

  @Column({ type: 'date', nullable: true })
  fecha_fin: Date;

  @ManyToOne(() => Familia)
  @JoinColumn({ name: 'id_familia' })
  familia: Familia;

  @Column({ nullable: false })
  id_familia: number;
}
