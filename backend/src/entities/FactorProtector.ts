import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Familia } from "./Familia";

@Entity()
export class FactorProtector {
  @PrimaryGeneratedColumn()
  id_factor_protector!: number;

  @Column({ length: 255 })
  descripcion!: string;

  @ManyToOne(() => Familia, (familia) => familia.factores_protectores)
  @JoinColumn({ name: "id_familia" })
  familia!: Familia;
}