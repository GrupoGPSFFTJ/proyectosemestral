import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('programa_nutricional')
export class ProgramaNutricional {
  @PrimaryGeneratedColumn({ name: 'id_programa_nutricional' })
  id_programa_nutricional: number;

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

  @Column({ name: 'activo', type: 'char', length: 1, nullable: false })
  activo: string;
}
