import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Paciente } from "./Paciente";
import { ProgramaSaludOral } from "./ProgramaSaludOral";
import { CentroSalud } from "./CentroSalud";
import { Usuario } from "./Usuario";
import { Odontograma } from "./Odontograma";
import { Radiografia } from "./Radiografia";

@Entity()
export class FichaOdontologica {
  @PrimaryGeneratedColumn()
  id_ficha_odontologica!: number;

  @Column()
  fecha_control!: Date;

  @Column({ type: "text", nullable: true })
  observacion!: string;

  @ManyToOne(() => Paciente, (paciente) => paciente.fichas_odontologicas)
  @JoinColumn({ name: "id_paciente" })
  paciente!: Paciente;

  @ManyToOne(() => ProgramaSaludOral)
  @JoinColumn({ name: "id_programa_salud_oral" })
  programa_salud_oral!: ProgramaSaludOral;

  @ManyToOne(() => CentroSalud)
  @JoinColumn({ name: "id_centro_salud" })
  centro_salud!: CentroSalud;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: "id_usuario_responsable" })
  usuario_responsable!: Usuario;

  @OneToMany(() => Odontograma, (odontograma) => odontograma.ficha_odontologica)
  odontogramas!: Odontograma[];

  @OneToMany(() => Radiografia, (radiografia) => radiografia.ficha_odontologica)
  radiografias!: Radiografia[];
}