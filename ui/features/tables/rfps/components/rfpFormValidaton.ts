// schemas/commission-schema.ts
import { z } from 'zod';

export const rfpRequestSchema = z.object({
  info: z
    .string({
      required_error: 'توضیحات الزامی است',
      invalid_type_error: 'توضیحات باید رشته باشد',
    })
    .min(1, { message: 'توضیحات نمی‌تواند خالی باشد' }),

  RFP_field_id: z.coerce
    .number({
      required_error: 'فیلد RFP الزامی است',
      invalid_type_error: 'شناسه فیلد RFP نامعتبر است',
    })
    .min(1, { message: 'فیلد RFP باید انتخاب شود' }),
});

export type RFPFormValues = z.infer<typeof rfpRequestSchema>;
