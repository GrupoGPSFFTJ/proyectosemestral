import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { FichaControl } from "./FichaClinica";
import { FichaOdontologica } from "./FichaOdontologica";
import { MiembroFamiliar } from "./MiembroFamiliar";
import { RegistroVacunacion } from "./RegistroVacunacion";
import { InscripcionPacam } from "./InscripcionPacam";
import { CentroSalud } from "./CentroSalud";

@Entity()
export class Paciente {
  @PrimaryGeneratedColumn()
  id_paciente!: number;

  @Column({ length: 100 })
  direccion!: string;

  @Column({ length: 12, unique: true })
  rut!: string;

  @Column({ length: 100 })
  nombre!: string;

  @Column({ length: 50 })
  apellido_paterno!: string;

  @Column({ length: 50 })
  apellido_materno!: string;

  @Column()
  fecha_nacimiento!: Date;

  @Column({ length: 1 })
  genero!: string;

  @Column({ length: 15 })
  telefono!: string;

  @OneToMany(() => FichaControl, (ficha) => ficha.paciente)
  fichas_control!: FichaControl[];

  @OneToMany(() => MiembroFamiliar, (miembro) => miembro.paciente)
  miembros_familiares!: MiembroFamiliar[];

  @OneToMany(() => FichaOdontologica, (ficha) => ficha.paciente)
  fichas_odontologicas!: FichaOdontologica[];

  @OneToMany(() => RegistroVacunacion, (registro) => registro.paciente)
  registros_vacunacion!: RegistroVacunacion[];

  @OneToMany(() => InscripcionPacam, (inscripcion) => inscripcion.paciente)
  inscripciones_pacam!: InscripcionPacam[];

  @ManyToOne(() => CentroSalud, (centro) => centro.pacientes)
  centro_salud!: CentroSalud;
}