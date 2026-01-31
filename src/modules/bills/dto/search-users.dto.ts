import { z } from 'zod';

export const SearchUsersSchema = z.object({
  name: z.string().min(1, 'Search query is required'),
});

export type SearchUsersDto = z.infer<typeof SearchUsersSchema>;
