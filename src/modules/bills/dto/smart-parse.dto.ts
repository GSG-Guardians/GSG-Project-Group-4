import { z } from 'zod';

export const SmartParseResponseSchema = z.object({
  name: z.string().nullable(),
  amount: z.number().nullable(),
  date: z.string().nullable(),
  type: z.enum(['individual', 'group']).nullable(),
});

export class SmartParseResponseDto {
  name!: string | null;
  amount!: number | null;
  date!: string | null;
  type!: 'individual' | 'group' | null;
}
