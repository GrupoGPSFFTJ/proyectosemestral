import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('familia')
export class Familia {
  @PrimaryGeneratedColumn()
  id_familia: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ type: 'date' })
  fecha_creacion: Date;
}
