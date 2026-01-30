import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const PeriodQuerySchema = z.object({
    period: z.enum(['day', 'week', 'month', 'year']).optional(),
    from: z.string().optional(),
    to: z.string().optional(),
    month: z.string().optional(),
});

export class PeriodQueryDto extends createZodDto(PeriodQuerySchema) { }
