import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Familia } from './familia.entity';

@Entity('factor_protector')
export class FactorProtector {
  @PrimaryGeneratedColumn()
  id_factor_protector: number;

  @Column({ length: 255 })
  descripcion: string;

  @ManyToOne(() => Familia)
  @JoinColumn({ name: 'id_familia' })
  familia: Familia;

  @Column({ nullable: false })
  id_familia: number;
}
