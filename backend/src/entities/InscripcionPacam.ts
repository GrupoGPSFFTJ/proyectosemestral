import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Paciente } from "./Paciente";
import { ProgramaNutricional } from "./ProgramaNutricional";
import { CentroSalud } from "./CentroSalud";
import { ControlDesembolso } from "./ControlDesembolso";

@Entity()
export class InscripcionPacam {
  @PrimaryGeneratedColumn()
  id_inscripcion_pacam!: number;

  @Column()
  fecha_inscripcion!: Date;

  @Column({ length: 1 })
  estado!: string;

  @ManyToOne(() => Paciente, (paciente) => paciente.inscripciones_pacam)
  @JoinColumn({ name: "id_paciente" })
  paciente!: Paciente;

  @ManyToOne(() => ProgramaNutricional, (programa) => programa.inscripciones)
  @JoinColumn({ name: "id_programa_nutricional" })
  programa_nutricional!: ProgramaNutricional;

  @ManyToOne(() => CentroSalud)
  @JoinColumn({ name: "id_centro_salud" })
  centro_salud!: CentroSalud;

  @OneToMany(() => ControlDesembolso, (control) => control.inscripcion_pacam)
  controles_desembolso!: ControlDesembolso[];
}