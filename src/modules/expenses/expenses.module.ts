import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';
import { Expense } from '../../../database/entities/expense.entities';
import { Income } from '../../../database/entities/income.entities';

@Module({
    imports: [TypeOrmModule.forFeature([Expense, Income])],
    controllers: [ExpensesController],
    providers: [ExpensesService],
    exports: [ExpensesService],
})
export class ExpensesModule { }
