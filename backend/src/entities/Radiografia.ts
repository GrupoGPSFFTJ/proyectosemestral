import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { FichaOdontologica } from "./FichaOdontologica";

@Entity()
export class Radiografia {
  @PrimaryGeneratedColumn()
  id_radiografia!: number;

  @Column({ length: 255 })
  path!: string;

  @Column({ nullable: true })
  fecha_toma!: Date;

  @ManyToOne(() => FichaOdontologica, (ficha) => ficha.radiografias)
  @JoinColumn({ name: "id_ficha_odontologica" })
  ficha_odontologica!: FichaOdontologica;
}