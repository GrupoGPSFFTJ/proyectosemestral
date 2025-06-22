import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum PacienteGenero {
  MASCULINO = 'Masculino',
  FEMENINO = 'Femenino',
  OTRO = 'Otro',
}

@Entity('paciente')
export class Paciente {
  @PrimaryGeneratedColumn()
  id_paciente: number;

  @Column({ length: 100 })
  direccion: string;

  @Column({ length: 12 })
  rut: string;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 50 })
  apellido_paterno: string;

  @Column({ length: 50 })
  apellido_materno: string;

  @Column({ type: 'date' })
  fecha_nacimiento: Date;

  @Column({
    type: 'enum',
    enum: PacienteGenero,
    name: 'genero',
    nullable: false,
  })
  genero: PacienteGenero;

  @Column({ length: 15 })
  telefono: string;
}
