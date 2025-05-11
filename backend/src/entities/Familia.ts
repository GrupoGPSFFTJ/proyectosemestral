import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { MiembroFamiliar } from "./MiembroFamiliar";
import { PlanIntervencion } from "./PlanIntervencion";
import { FactorRiesgo } from "./FactorRiesgo";
import { FactorProtector } from "./FactorProtector";

@Entity()
export class Familia {
  @PrimaryGeneratedColumn()
  id_familia!: number;

  @Column({ length: 100 })
  nombre!: string;

  @Column()
  fecha_creacion!: Date;

  @OneToMany(() => MiembroFamiliar, (miembro) => miembro.familia)
  miembros!: MiembroFamiliar[];

  @OneToMany(() => PlanIntervencion, (plan) => plan.familia)
  planes_intervencion!: PlanIntervencion[];

  @OneToMany(() => FactorRiesgo, (factor) => factor.familia)
  factores_riesgo!: FactorRiesgo[];

  @OneToMany(() => FactorProtector, (factor) => factor.familia)
  factores_protectores!: FactorProtector[];
}