import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { RegistroVacunacion } from "./RegistroVacunacion";

@Entity()
export class AlertaInasistencia {
  @PrimaryGeneratedColumn()
  id_alerta_inasistencia!: number;

  @Column()
  fecha_alerta!: Date;

  @Column({ length: 255 })
  motivo!: string;

  @OneToOne(() => RegistroVacunacion)
  @JoinColumn({ name: "id_registro_vacunacion" })
  registro_vacunacion!: RegistroVacunacion;
}