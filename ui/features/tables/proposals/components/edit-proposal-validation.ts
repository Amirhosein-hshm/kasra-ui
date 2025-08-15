import { z } from 'zod';

export const proposalUpdateSchema = z.object({
  startAt: z.date({ message: 'تاریخ شروع اجباری است' }),
  endAt: z.date({ message: 'تاریخ پایان اجباری است' }),
});

export type ProposalUpdateFormValues = z.infer<typeof proposalUpdateSchema>;
