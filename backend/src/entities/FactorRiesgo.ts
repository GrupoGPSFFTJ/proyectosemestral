import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Familia } from "./Familia";

@Entity()
export class FactorRiesgo {
  @PrimaryGeneratedColumn()
  id_factor_riesgo!: number;

  @Column({ length: 255 })
  descripcion!: string;

  @ManyToOne(() => Familia, (familia) => familia.factores_riesgo)
  @JoinColumn({ name: "id_familia" })
  familia!: Familia;
}