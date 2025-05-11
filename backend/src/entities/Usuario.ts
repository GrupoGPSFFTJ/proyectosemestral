import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import { CentroSalud } from "./CentroSalud";
import { Rol } from "./Rol";

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario!: number;

  @Column({ length: 50, unique: true })
  username!: string;

  @Column({ length: 255 })
  password_hash!: string;

  @Column({ length: 100 })
  nombre!: string;

  @Column({ length: 100, unique: true })
  email!: string;

  @Column({ length: 1 })
  estado!: string;

  @ManyToOne(() => CentroSalud, (centro) => centro.usuarios)
  @JoinColumn({ name: "id_centro_salud" })
  centro_salud!: CentroSalud;

  @ManyToMany(() => Rol, (rol) => rol.usuarios)
  @JoinTable({
    name: "usuario_rol",
    joinColumn: { name: "id_usuario", referencedColumnName: "id_usuario" },
    inverseJoinColumn: { name: "id_rol", referencedColumnName: "id_rol" }
  })
  roles!: Rol[];
}