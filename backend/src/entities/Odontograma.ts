import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { FichaOdontologica } from "./FichaOdontologica";

@Entity()
export class Odontograma {
  @PrimaryGeneratedColumn()
  id_odontograma!: number;

  @Column({ length: 5 })
  pieza_dental!: string;

  @Column({ length: 50 })
  estado!: string;

  @Column({ type: "text", nullable: true })
  observacion!: string;

  @ManyToOne(() => FichaOdontologica, (ficha) => ficha.odontogramas)
  @JoinColumn({ name: "id_ficha_odontologica" })
  ficha_odontologica!: FichaOdontologica;
}