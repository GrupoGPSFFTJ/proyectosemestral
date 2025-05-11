import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Usuario } from "./Usuario";

@Entity()
export class Rol {
  @PrimaryGeneratedColumn()
  id_rol!: number;

  @Column({ length: 100, unique: true })
  nombre!: string;

  @Column({ type: "text", nullable: true })
  descripcion!: string;

  @ManyToMany(() => Usuario, (usuario) => usuario.roles)
  usuarios!: Usuario[];
}