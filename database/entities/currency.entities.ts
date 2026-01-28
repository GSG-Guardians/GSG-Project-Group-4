import { Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity({ name: 'currencies' })
@Index(['code'], { unique: true })
export class Currency {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 3, unique: true })
  code: string;

  @Column('varchar', { length: 10, nullable: true })
  symbol: string | null;

  @Column('varchar', { length: 100 })
  name: string;
}
