import { z } from 'zod';

export const proposalUpdateSchema = z.object({
  info: z
    .string({
      invalid_type_error: 'عنوان باید رشته باشد',
    })
    .min(1, { message: 'عنوان نمی‌تواند خالی باشد' })
    .nullable()
    .optional(),

  RFP_id: z.coerce
    .number({
      invalid_type_error: 'شناسه RFP باید عدد باشد',
    })
    .min(1, { message: 'شناسه RFP باید عددی معتبر باشد' })
    .nullable()
    .optional(),

  fileId: z.coerce
    .number({
      invalid_type_error: 'شناسه فایل باید عدد باشد',
    })
    .min(1, { message: 'شناسه فایل باید عددی معتبر باشد' })
    .nullable()
    .optional(),
});

export type ProposalUpdateFormValues = z.infer<typeof proposalUpdateSchema>;
