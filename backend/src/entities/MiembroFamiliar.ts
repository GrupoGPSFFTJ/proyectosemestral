import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Familia } from "./Familia";
import { TipoRelacion } from "./TipoRelacion";
import { Paciente } from "./Paciente";

@Entity()
export class MiembroFamiliar {
  @PrimaryGeneratedColumn()
  id_miembro_familiar!: number;

  @Column({ length: 100 })
  nombre!: string;

  @Column({ nullable: true })
  fecha_nacimiento!: Date;

  @Column({ length: 1, nullable: true })
  genero!: string;

  @ManyToOne(() => Familia, (familia) => familia.miembros)
  @JoinColumn({ name: "id_familia" })
  familia!: Familia;

  @ManyToOne(() => TipoRelacion)
  @JoinColumn({ name: "id_tipo_relacion" })
  tipo_relacion!: TipoRelacion;

  @ManyToOne(() => Paciente, (paciente) => paciente.miembros_familiares, { nullable: true })
  @JoinColumn({ name: "id_paciente" })
  paciente!: Paciente | null;
}