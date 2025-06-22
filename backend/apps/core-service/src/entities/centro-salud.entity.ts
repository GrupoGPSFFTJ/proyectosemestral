import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'centro_salud' })
export class CentroSalud {
  @PrimaryGeneratedColumn()
  id_centro_salud: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 255 })
  direccion: string;

  @Column({ length: 15 })
  telefono: string;
}
