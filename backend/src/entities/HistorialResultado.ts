import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { FichaControl } from "./FichaClinica";

@Entity()
export class HistorialResultado {
  @PrimaryGeneratedColumn()
  id_historial_resultado!: number;

  @Column()
  fecha_registro!: Date;

  @Column({ nullable: true })
  presion_sistolica!: number;

  @Column({ nullable: true })
  presion_diastolica!: number;

  @Column({ nullable: true })
  frecuencia_cardiaca!: number;

  @Column({ type: "numeric", precision: 5, scale: 2, nullable: true })
  glicemia!: number;

  @Column({ type: "numeric", precision: 5, scale: 2, nullable: true })
  peso!: number;

  @Column({ type: "numeric", precision: 4, scale: 2, nullable: true })
  talla!: number;

  @Column({ type: "numeric", precision: 4, scale: 2, nullable: true })
  imc!: number;

  @Column({ type: "text", nullable: true })
  observacion!: string;

  @ManyToOne(() => FichaControl, (ficha) => ficha.historiales)
  @JoinColumn({ name: "id_ficha_control" })
  ficha_control!: FichaControl;
}