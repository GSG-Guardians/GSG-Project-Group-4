import {
    Body,
    Controller,
    Get,
    Post,
    Query,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import {
    CreateExpenseDto,
    PeriodQueryDto,
    CategoryQueryDto,
} from './dto';

@Controller('v1/expenses')
export class ExpensesController {
    constructor(private readonly expensesService: ExpensesService) { }

    @Get('overview')
    async getOverview(@Query() query: PeriodQueryDto) {
        return this.expensesService.getOverview(query);
    }

    @Get('categories/breakdown')
    async getCategoriesBreakdown(@Query() query: PeriodQueryDto) {
        return this.expensesService.getCategoriesBreakdown(query);
    }

    @Get('charts/donut')
    async getDonutChart(@Query() query: PeriodQueryDto) {
        return this.expensesService.getDonutChart(query);
    }

    @Get('categories')
    async getCategories(@Query() query: CategoryQueryDto) {
        return this.expensesService.getCategories(query);
    }

    @Post()
    async createExpense(@Body() dto: CreateExpenseDto) {
        return this.expensesService.createExpense(dto);
    }
}
