import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { CalendarioVacuna } from "./CalendarioVacuna";
import { RegistroVacunacion } from "./RegistroVacunacion";

@Entity()
export class Vacuna {
  @PrimaryGeneratedColumn()
  id_vacuna!: number;

  @Column({ length: 10, unique: true })
  codigo!: string;

  @Column({ length: 100 })
  nombre!: string;

  @Column({ length: 255 })
  descripcion!: string;

  @OneToMany(() => CalendarioVacuna, (calendario) => calendario.vacuna)
  calendarios!: CalendarioVacuna[];

  @OneToMany(() => RegistroVacunacion, (registro) => registro.vacuna)
  registros!: RegistroVacunacion[];
}