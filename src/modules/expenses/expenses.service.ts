import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Expense } from '../../../database/entities/expense.entities';
import { Income } from '../../../database/entities/income.entities';
import {
    CreateExpenseDto,
    PeriodQueryDto,
    ExpensesOverviewDto,
    CategoryBreakdownDto,
    CategoryBreakdownItemDto,
    DonutChartDto,
    DonutSegmentDto,
    CategoryQueryDto,
} from './dto';

@Injectable()
export class ExpensesService {
    constructor(
        @InjectRepository(Expense)
        private readonly expenseRepository: Repository<Expense>,
        @InjectRepository(Income)
        private readonly incomeRepository: Repository<Income>,
    ) { }

    async getOverview(query: PeriodQueryDto): Promise<ExpensesOverviewDto> {
        const { from, to } = this.getDateRange(query);

        // Get total expenses
        const expensesResult = await this.expenseRepository
            .createQueryBuilder('expense')
            .select('SUM(CAST(expense.amount AS DECIMAL))', 'total')
            .where('expense.expenseDate BETWEEN :from AND :to', { from, to })
            .getRawOne();

        // Get total income
        const incomeResult = await this.incomeRepository
            .createQueryBuilder('income')
            .select('SUM(CAST(income.amount AS DECIMAL))', 'total')
            .where('income.incomeDate BETWEEN :from AND :to', { from, to })
            .getRawOne();

        const totalExpenses = parseFloat(expensesResult?.total || '0');
        const totalIncome = parseFloat(incomeResult?.total || '0');
        const totalBalance = totalIncome - totalExpenses;

        return {
            totalBalance,
            totalIncome,
            totalExpenses,
        };
    }

    async getCategoriesBreakdown(
        query: PeriodQueryDto,
    ): Promise<CategoryBreakdownDto> {
        const { from, to } = this.getDateRange(query);

        const categoriesData = await this.expenseRepository
            .createQueryBuilder('expense')
            .select('expense.category', 'category')
            .addSelect('SUM(CAST(expense.amount AS DECIMAL))', 'totalAmount')
            .where('expense.expenseDate BETWEEN :from AND :to', { from, to })
            .groupBy('expense.category')
            .getRawMany();

        const total = categoriesData.reduce(
            (sum, cat) => sum + parseFloat(cat.totalAmount || '0'),
            0,
        );

        const categories: CategoryBreakdownItemDto[] = categoriesData.map(
            (cat) => ({
                category: cat.category,
                totalAmount: parseFloat(cat.totalAmount || '0'),
                percentage: total > 0 ? (parseFloat(cat.totalAmount || '0') / total) * 100 : 0,
            }),
        );

        return { categories };
    }

    async getDonutChart(query: PeriodQueryDto): Promise<DonutChartDto> {
        const { from, to } = this.getDateRange(query);

        const segmentsData = await this.expenseRepository
            .createQueryBuilder('expense')
            .select('expense.category', 'category')
            .addSelect('SUM(CAST(expense.amount AS DECIMAL))', 'amount')
            .where('expense.expenseDate BETWEEN :from AND :to', { from, to })
            .groupBy('expense.category')
            .getRawMany();

        const total = segmentsData.reduce(
            (sum, seg) => sum + parseFloat(seg.amount || '0'),
            0,
        );

        const segments: DonutSegmentDto[] = segmentsData.map((seg) => ({
            category: seg.category,
            amount: parseFloat(seg.amount || '0'),
            percentage: total > 0 ? (parseFloat(seg.amount || '0') / total) * 100 : 0,
        }));

        return { segments, total };
    }

    async getCategories(query: CategoryQueryDto) {
        // This would typically fetch from a categories table
        // For now, returning hardcoded expense categories
        const expenseCategories = [
            { name: 'Food', percentage: 0 },
            { name: 'Transport', percentage: 0 },
            { name: 'Entertainment', percentage: 0 },
            { name: 'Health', percentage: 0 },
            { name: 'Housing', percentage: 0 },
            { name: 'Others', percentage: 0 },
        ];

        // Calculate actual percentages from expenses
        const categoriesData = await this.expenseRepository
            .createQueryBuilder('expense')
            .select('expense.category', 'category')
            .addSelect('SUM(CAST(expense.amount AS DECIMAL))', 'total')
            .groupBy('expense.category')
            .getRawMany();

        const totalExpenses = categoriesData.reduce(
            (sum, cat) => sum + parseFloat(cat.total || '0'),
            0,
        );

        const categoriesWithPercentage = expenseCategories.map((cat) => {
            const found = categoriesData.find(
                (c) => c.category.toLowerCase() === cat.name.toLowerCase(),
            );
            const amount = found ? parseFloat(found.total || '0') : 0;
            return {
                ...cat,
                percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0,
            };
        });

        return { categories: categoriesWithPercentage };
    }

    async createExpense(dto: CreateExpenseDto) {
        const expense = this.expenseRepository.create({
            amount: dto.amount.toString(),
            category: dto.category,
            description: dto.description || null,
            expenseDate: dto.date,
            currencyId: dto.currencyId,
            assetId: dto.assetId,
            // userId would come from auth context in real implementation
        });

        await this.expenseRepository.save(expense);

        return {
            id: expense.id,
            amount: parseFloat(expense.amount),
            category: expense.category,
            description: expense.description,
            date: expense.expenseDate,
            currencyId: expense.currencyId,
        };
    }

    private getDateRange(query: PeriodQueryDto): { from: string; to: string } {
        if (query.from && query.to) {
            return { from: query.from, to: query.to };
        }

        const now = new Date();
        let from: Date;
        let to: Date = now;

        switch (query.period) {
            case 'day':
                from = new Date(now);
                from.setHours(0, 0, 0, 0);
                break;
            case 'week':
                from = new Date(now);
                from.setDate(now.getDate() - 7);
                break;
            case 'month':
                if (query.month) {
                    // Parse month like '2026-01'
                    const [year, month] = query.month.split('-').map(Number);
                    from = new Date(year, month - 1, 1);
                    to = new Date(year, month, 0); // Last day of month
                } else {
                    from = new Date(now.getFullYear(), now.getMonth(), 1);
                }
                break;
            case 'year':
                from = new Date(now.getFullYear(), 0, 1);
                break;
            default:
                // Default to current month
                from = new Date(now.getFullYear(), now.getMonth(), 1);
        }

        return {
            from: from.toISOString().split('T')[0],
            to: to.toISOString().split('T')[0],
        };
    }
}
