import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { MiembroFamiliar } from "./MiembroFamiliar";

@Entity()
export class TipoRelacion {
  @PrimaryGeneratedColumn()
  id_tipo_relacion!: number;

  @Column({ length: 255 })
  descripcion!: string;

  @OneToMany(() => MiembroFamiliar, (miembro) => miembro.tipo_relacion)
  miembros!: MiembroFamiliar[];
}