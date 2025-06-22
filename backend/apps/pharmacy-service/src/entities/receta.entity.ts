import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('receta')
export class Receta {
  @PrimaryGeneratedColumn({ name: 'id_receta' })
  id_receta: number;

  @Column({ name: 'id_paciente', type: 'int', nullable: false })
  id_paciente: number;

  @Column({ name: 'id_medico', type: 'int', nullable: false })
  id_medico: number;

  @Column({ name: 'fecha_emision', type: 'date', nullable: false })
  fecha_emision: Date;

  @Column({ name: 'indicacion', type: 'text', nullable: true })
  indicacion: string | null;
}
