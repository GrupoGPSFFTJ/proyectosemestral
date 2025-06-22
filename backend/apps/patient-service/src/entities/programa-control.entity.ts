import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('programa_control')
export class ProgramaControl {
  @PrimaryGeneratedColumn()
  id_programa_control: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 255, nullable: true })
  descripcion: string;

  @Column({ length: 1 })
  activo: string;

  @Column({ length: 10, unique: true })
  codigo: string;
}
