import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { FichaControl } from "./FichaClinica";
import { Paciente } from "./Paciente";
import { Usuario } from "./Usuario";

@Entity()
export class EstratificacionRiesgo {
  @PrimaryGeneratedColumn()
  id_estratificacion_riesgo!: number;

  @Column({ length: 20 })
  nivel_riesgo!: string; // Ej: "Alto", "Medio", "Bajo"

  @Column({ length: 255 })
  motivo!: string;

  @Column()
  fecha_asignacion!: Date;

  @ManyToOne(() => FichaControl, (ficha) => ficha.estratificaciones_riesgo)
  @JoinColumn({ name: "id_ficha_control" })
  ficha_control!: FichaControl;

  @ManyToOne(() => Paciente)
  @JoinColumn({ name: "id_paciente" })
  paciente!: Paciente;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: "usuario_responsable" })
  usuario_responsable!: Usuario;
}