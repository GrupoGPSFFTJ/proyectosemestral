import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Vacuna } from "./Vacuna";

@Entity()
export class CalendarioVacuna {
  @PrimaryGeneratedColumn()
  id_calendario_vacuna!: number;

  @Column()
  edad_recomendada!: number;

  @Column()
  dosis!: number;

  @Column({ length: 50, nullable: true })
  etapa!: string;

  @ManyToOne(() => Vacuna, (vacuna) => vacuna.calendarios)
  @JoinColumn({ name: "id_vacuna" })
  vacuna!: Vacuna;
}