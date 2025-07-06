// schemas/commission-schema.ts
import { z } from 'zod';

export const commissionSchema = z.object({
  state: z.coerce
    .number({
      required_error: 'وضعیت الزامی است',
      invalid_type_error: 'وضعیت نامعتبر است',
    })
    .min(0, { message: 'وضعیت باید انتخاب شود' }),

  title: z
    .string({
      required_error: 'عنوان الزامی است',
      invalid_type_error: 'عنوان باید رشته باشد',
    })
    .min(1, { message: 'عنوان نمی‌تواند خالی باشد' }),

  comment: z
    .string({
      required_error: 'توضیحات الزامی است',
      invalid_type_error: 'توضیحات باید رشته باشد',
    })
    .min(1, { message: 'توضیحات نمی‌تواند خالی باشد' }),

  userMasterId: z.coerce.number({
    required_error: 'مدیر الزامی است',
    invalid_type_error: 'مدیر نامعتبر است',
  }),

  userDiscovererId: z.coerce.number({
    required_error: 'کاشف الزامی است',
    invalid_type_error: 'کاشف نامعتبر است',
  }),

  userSupervisorId: z.coerce.number({
    required_error: 'ناظر الزامی است',
    invalid_type_error: 'ناظر نامعتبر است',
  }),
});

export type CommissionFormValues = z.infer<typeof commissionSchema>;
