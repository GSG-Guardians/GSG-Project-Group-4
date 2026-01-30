import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CategoryQuerySchema = z.object({
    type: z.enum(['expense', 'income']).optional(),
});

export class CategoryQueryDto extends createZodDto(CategoryQuerySchema) { }
