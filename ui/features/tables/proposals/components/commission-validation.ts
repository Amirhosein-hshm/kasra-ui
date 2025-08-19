// schemas/commission-schema.ts
import { z } from 'zod';

export const commissionSchema = z.object({
  supervisorId: z.coerce.number({
    required_error: 'ناظر الزامی است',
    invalid_type_error: 'ناظر نامعتبر است',
  }),
  startAt: z.date({
    message: 'تاریخ شروع اجباری است',
    invalid_type_error: 'تاریخ شروع نا معتبر است',
  }),
  comment: z.coerce.string({
    message: 'توضحیات اجباری است',
    invalid_type_error: 'توضیحات نا معتبر است',
  }),
});

export type CommissionFormValues = z.infer<typeof commissionSchema>;
