import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { ProgramaNutricional } from "./ProgramaNutricional";

@Entity()
export class InformePacam {
  @PrimaryGeneratedColumn()
  id_informe_pacam!: number;

  @Column()
  fecha_informe!: Date;

  @Column()
  total_beneficiario!: number;

  @Column({ type: "numeric", precision: 10, scale: 2 })
  total_desembolso!: number;

  @ManyToOne(() => ProgramaNutricional, (programa) => programa.informes)
  @JoinColumn({ name: "id_programa_nutricional" })
  programa_nutricional!: ProgramaNutricional;
}