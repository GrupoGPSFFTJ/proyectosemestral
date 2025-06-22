import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vacuna')
export class Vacuna {
  @PrimaryGeneratedColumn({ name: 'id_vacuna' })
  id_vacuna: number;

  @Column({ name: 'codigo', type: 'varchar', length: 10, nullable: false })
  codigo: string;

  @Column({ name: 'nombre', type: 'varchar', length: 100, nullable: false })
  nombre: string;

  @Column({
    name: 'descripcion',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  descripcion: string;
}
