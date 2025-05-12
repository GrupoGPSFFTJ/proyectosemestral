import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { Paciente } from "./Paciente";
import { Vacuna } from "./Vacuna";
import { CalendarioVacuna } from "./CalendarioVacuna";
import { CentroSalud } from "./CentroSalud";
import { Usuario } from "./Usuario";
import { AlertaInasistencia } from "./AlertaInasistencia";

@Entity()
export class RegistroVacunacion {
  @PrimaryGeneratedColumn()
  id_registro_vacunacion!: number;

  @Column()
  fecha_aplicacion!: Date;

  @Column({ length: 50, nullable: true })
  lote!: string;

  @ManyToOne(() => Paciente, (paciente) => paciente.registros_vacunacion)
  @JoinColumn({ name: "id_paciente" })
  paciente!: Paciente;

  @ManyToOne(() => Vacuna, (vacuna) => vacuna.registros)
  @JoinColumn({ name: "id_vacuna" })
  vacuna!: Vacuna;

  @ManyToOne(() => CalendarioVacuna)
  @JoinColumn({ name: "id_calendario_vacuna" })
  calendario_vacuna!: CalendarioVacuna;

  @ManyToOne(() => CentroSalud)
  @JoinColumn({ name: "id_centro_salud" })
  centro_salud!: CentroSalud;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: "id_usuario_responsable" })
  usuario_responsable!: Usuario;

  @OneToOne(() => AlertaInasistencia, (alerta) => alerta.registro_vacunacion)
  alerta_inasistencia!: AlertaInasistencia;
}