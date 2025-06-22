import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FichaOdontologica } from './ficha-odontologica.entity';

@Entity('radiografia')
export class Radiografia {
  @PrimaryGeneratedColumn({ name: 'id_radiografia' })
  id_radiografia: number;

  @Column({ name: 'path', type: 'varchar', length: 255, nullable: false })
  path: string;

  @Column({ name: 'fecha_toma', type: 'date', nullable: true })
  fecha_toma: Date | null;

  @ManyToOne(() => FichaOdontologica)
  @JoinColumn({ name: 'id_ficha_odontologica' })
  fichaOdontologica: FichaOdontologica;

  @Column({ nullable: false })
  id_ficha_odontologica: number;
}
