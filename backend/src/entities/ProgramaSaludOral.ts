import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { FichaOdontologica } from "./FichaOdontologica";

@Entity()
export class ProgramaSaludOral {
  @PrimaryGeneratedColumn()
  id_programa_salud_oral!: number;

  @Column({ length: 10, unique: true })
  codigo!: string;

  @Column({ length: 100 })
  nombre!: string;

  @Column({ length: 255, nullable: true })
  descripcion!: string;

  @Column({ length: 1 })
  activo!: string;

  @OneToMany(() => FichaOdontologica, (ficha) => ficha.programa_salud_oral)
  fichas_odontologicas!: FichaOdontologica[];
}