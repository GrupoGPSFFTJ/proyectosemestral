import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('programa_salud_oral')
export class ProgramaSaludOral {
  @PrimaryGeneratedColumn({ name: 'id_programa_salud_oral' })
  id_programa_salud_oral: number;

  @Column({ name: 'codigo', type: 'varchar', length: 10, nullable: false })
  codigo: string;

  @Column({ name: 'nombre', type: 'varchar', length: 100, nullable: false })
  nombre: string;

  @Column({ name: 'descripcion', type: 'varchar', length: 255, nullable: true })
  descripcion: string | null;

  @Column({ name: 'activo', type: 'char', length: 1, nullable: false })
  activo: string;
}
