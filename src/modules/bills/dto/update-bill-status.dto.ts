import { z } from 'zod';

export const UpdateBillStatusSchema = z.object({
  status: z.enum(['paid', 'unpaid']),
});

export type UpdateBillStatusDto = z.infer<typeof UpdateBillStatusSchema>;
