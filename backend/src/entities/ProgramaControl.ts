import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { FichaControl } from "./FichaClinica";

@Entity()
export class ProgramaControl {
  @PrimaryGeneratedColumn()
  id_programa_control!: number;

  @Column({ length: 100 })
  nombre!: string;

  @Column({ length: 255, nullable: true })
  descripcion!: string;

  @Column({ length: 1 })
  activo!: string;

  @Column({ length: 10, unique: true })
  codigo!: string;

  @OneToMany(() => FichaControl, (ficha) => ficha.programa_control)
  fichas_control!: FichaControl[];
}