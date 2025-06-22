import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Rol } from './rol.entity';

@Entity({ name: 'usuario_rol' })
export class UsuarioRol {
  @PrimaryColumn()
  id_usuario: number;

  @PrimaryColumn()
  @Column({ default: 1 })
  id_rol: number;

  @ManyToOne(() => Usuario, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @ManyToOne(() => Rol, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_rol' })
  rol: Rol;
}
