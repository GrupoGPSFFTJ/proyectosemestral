import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { InscripcionPacam } from "./InscripcionPacam";
import { InformePacam } from "./InformePacam";

@Entity()
export class ProgramaNutricional {
  @PrimaryGeneratedColumn()
  id_programa_nutricional!: number;

  @Column({ length: 10, unique: true })
  codigo!: string;

  @Column({ length: 100 })
  nombre!: string;

  @Column({ length: 255 })
  descripcion!: string;

  @Column({ length: 1 })
  activo!: string;

  @OneToMany(() => InscripcionPacam, (inscripcion) => inscripcion.programa_nutricional)
  inscripciones!: InscripcionPacam[];

  @OneToMany(() => InformePacam, (informe) => informe.programa_nutricional)
  informes!: InformePacam[];
}