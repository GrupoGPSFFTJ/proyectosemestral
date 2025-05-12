import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Familia } from "./Familia";

@Entity()
export class PlanIntervencion {
  @PrimaryGeneratedColumn()
  id_plan_intervencion!: number;

  @Column({ length: 100 })
  nombre!: string;

  @Column({ length: 255, nullable: true })
  descripcion!: string;

  @Column({ nullable: true })
  fecha_inicio!: Date;

  @Column({ nullable: true })
  fecha_fin!: Date;

  @ManyToOne(() => Familia, (familia) => familia.planes_intervencion)
  @JoinColumn({ name: "id_familia" })
  familia!: Familia;
}