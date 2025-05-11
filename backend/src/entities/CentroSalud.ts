import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Usuario } from "./Usuario";
import { Paciente } from "./Paciente";
import { FichaControl } from "./FichaControl";
import { FichaOdontologica } from "./FichaOdontologica";
import { RegistroVacunacion } from "./RegistroVacunacion";
import { InscripcionPacam } from "./InscripcionPacam";

@Entity()
export class CentroSalud {
  @PrimaryGeneratedColumn()
  id_centro_salud!: number;

  @Column({ length: 100 })
  nombre!: string;

  @Column({ length: 255 })
  direccion!: string;

  @Column({ length: 15 })
  telefono!: string;

  @Column({ type: "numeric", precision: 9, scale: 6, nullable: true })
  latitud!: number;

  @Column({ type: "numeric", precision: 9, scale: 6, nullable: true })
  longitud!: number;

  @OneToMany(() => Usuario, (usuario) => usuario.centro_salud)
  usuarios!: Usuario[];

  @OneToMany(() => Paciente, (paciente) => paciente.centro_salud)
  pacientes!: Paciente[];

  @OneToMany(() => FichaControl, (ficha) => ficha.centro_salud)
  fichas_control!: FichaControl[];

  @OneToMany(() => FichaOdontologica, (ficha) => ficha.centro_salud)
  fichas_odontologicas!: FichaOdontologica[];

  @OneToMany(() => RegistroVacunacion, (registro) => registro.centro_salud)
  registros_vacunacion!: RegistroVacunacion[];

  @OneToMany(() => InscripcionPacam, (inscripcion) => inscripcion.centro_salud)
  inscripciones_pacam!: InscripcionPacam[];
}