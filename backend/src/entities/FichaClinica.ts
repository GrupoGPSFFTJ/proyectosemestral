import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Paciente } from "./Paciente";
import { ProgramaControl } from "./ProgramaControl";
import { CentroSalud } from "./CentroSalud";
import { Usuario } from "./Usuario";
import { HistorialResultado } from "./HistorialResultado";
import { EstratificacionRiesgo } from "./EstratificacionRiesgo";

@Entity()
export class FichaControl {
  @PrimaryGeneratedColumn()
  id_ficha_control!: number;

  @Column()
  fecha_control!: Date;

  @Column({ type: "text", nullable: true })
  observacion!: string;

  @ManyToOne(() => Paciente, (paciente) => paciente.fichas_control)
  @JoinColumn({ name: "id_paciente" })
  paciente!: Paciente;

  @ManyToOne(() => ProgramaControl)
  @JoinColumn({ name: "id_programa_control" })
  programa_control!: ProgramaControl;

  @ManyToOne(() => CentroSalud)
  @JoinColumn({ name: "id_centro_salud" })
  centro_salud!: CentroSalud;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: "id_usuario_responsable" })
  usuario_responsable!: Usuario;

  @OneToMany(() => HistorialResultado, (historial) => historial.ficha_control)
  historiales!: HistorialResultado[];

  @OneToMany(() => EstratificacionRiesgo, (estratificacion) => estratificacion.ficha_control)
  estratificaciones_riesgo!: EstratificacionRiesgo[];
}