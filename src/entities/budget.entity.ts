import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserE } from './user.entity';
import { BudgetCategory } from 'src/enums/budget-category.enum';

@Entity('budget')
export class BudgetE {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: BudgetCategory,
  })
  category: BudgetCategory;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  allocated_amount: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  spent_amount: number;

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date' })
  end_date: Date;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  // Percentage calculated from spent vs allocated
  // This can be calculated in the service layer
  // spent_percentage: number;

  // Relationship to User - the user who created this budget
  @ManyToOne(() => UserE, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserE;

  @Column({ type: 'uuid' })
  user_id: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz', name: 'deleted_at' })
  deletedAt?: Date;
}
