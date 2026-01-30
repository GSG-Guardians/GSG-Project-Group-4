import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateExpenseSchema = z.object({
    amount: z.number().positive('Amount must be positive'),
    category: z.string().min(1, 'Category is required'),
    description: z.string().optional(),
    date: z.string().min(1, 'Date is required'),
    currencyId: z.string().uuid().optional(),
    assetId: z.string().uuid().nullable().optional(),
});

export class CreateExpenseDto extends createZodDto(CreateExpenseSchema) { }
