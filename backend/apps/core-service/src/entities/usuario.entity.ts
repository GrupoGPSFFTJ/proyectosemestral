import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CentroSalud } from './centro-salud.entity';

export enum UsuarioEstado {
  ACTIVO = 'Activo',
  INACTIVO = 'Inactivo',
}

@Entity({ name: 'usuario' })
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column({ length: 50, unique: true })
  username: string;

  @Column({ length: 255 })
  password_hash: string;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: UsuarioEstado,
    default: UsuarioEstado.ACTIVO,
    name: 'estado',
  })
  estado: UsuarioEstado;

  @ManyToOne(() => CentroSalud)
  @JoinColumn({ name: 'id_centro_salud' })
  centroSalud: CentroSalud;

  @Column({ nullable: false })
  id_centro_salud: number;
}
