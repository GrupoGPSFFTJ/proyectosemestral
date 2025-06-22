import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FichaOdontologica } from './ficha-odontologica.entity';

@Entity('odontograma')
export class Odontograma {
  @PrimaryGeneratedColumn({ name: 'id_odontograma' })
  id_odontograma: number;

  @Column({ name: 'pieza_dental', type: 'varchar', length: 5, nullable: false })
  pieza_dental: string;

  @Column({ name: 'estado', type: 'varchar', length: 50, nullable: false })
  estado: string;

  @Column({ name: 'observacion', type: 'text', nullable: true })
  observacion: string | null;

  @ManyToOne(() => FichaOdontologica)
  @JoinColumn({ name: 'id_ficha_odontologica' })
  fichaOdontologica: FichaOdontologica;

  @Column({ nullable: false })
  id_ficha_odontologica: number;
}
