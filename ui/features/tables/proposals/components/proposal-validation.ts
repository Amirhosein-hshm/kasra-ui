import { z } from 'zod';

export const proposalSchema = z.object({
  info: z
    .string({
      required_error: 'عنوان الزامی است',
      invalid_type_error: 'عنوان باید رشته باشد',
    })
    .min(1, { message: 'عنوان نمی‌تواند خالی باشد' }),

  RFP_id: z.coerce
    .number({
      required_error: 'شناسه RFP الزامی است',
      invalid_type_error: 'شناسه RFP باید عدد باشد',
    })
    .min(1, { message: 'شناسه RFP نمی‌تواند صفر یا کمتر باشد' }),

  comment: z
    .string({
      required_error: 'توضیحات الزامی است',
      invalid_type_error: 'توضیحات باید رشته باشد',
    })
    .min(1, { message: 'توضیحات نمی‌تواند خالی باشد' }),
});

export type ProposalFormValues = z.infer<typeof proposalSchema>;
