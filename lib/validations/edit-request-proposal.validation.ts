import { z } from 'zod';

export const editRequestOnProposalSchema = z.object({
  // Basic Information
  comment: z
    .string({
      required_error: 'نظر الزامی است',
    })
    .min(1, 'نظر الزامی است'),
});

export type EditRequestOnProposalFormValues = z.infer<
  typeof editRequestOnProposalSchema
>;
