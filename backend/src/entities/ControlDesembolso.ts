import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { InscripcionPacam } from "./InscripcionPacam";7

@Entity()
export class ControlDesembolso {
  @PrimaryGeneratedColumn()
  id_control_desembolso!: number;

  @Column()
  fecha_entrega!: Date;

  @Column({ type: "numeric", precision: 8, scale: 2 })
  cantidad_entregada!: number;

  @ManyToOne(() => InscripcionPacam, (inscripcion) => inscripcion.controles_desembolso)
  @JoinColumn({ name: "id_inscripcion_pacam" })
  inscripcion_pacam!: InscripcionPacam;
}