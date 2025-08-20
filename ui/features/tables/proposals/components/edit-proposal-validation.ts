// edit-proposal-validation.ts
import { z } from 'zod';

export const proposalUpdateSchema = z.object({
  startAt: z.date({
    required_error: 'تاریخ شروع الزامی است',
    invalid_type_error: 'تاریخ شروع نامعتبر است',
  }),
  endAt: z.date({
    required_error: 'تاریخ پایان الزامی است',
    invalid_type_error: 'تاریخ پایان نامعتبر است',
  }),
  applicantName: z
    .string({
      required_error: 'نام متقاضی الزامی است',
      invalid_type_error: 'نام متقاضی باید رشته باشد',
    })
    .min(1, { message: 'نام متقاضی نمی‌تواند خالی باشد' }),
  contactNumber: z
    .string({
      required_error: 'شماره تماس الزامی است',
      invalid_type_error: 'شماره تماس باید رشته باشد',
    })
    .min(1, { message: 'شماره تماس نمی‌تواند خالی باشد' }),
  education: z
    .string({
      required_error: 'تحصیلات الزامی است',
      invalid_type_error: 'تحصیلات باید رشته باشد',
    })
    .min(1, { message: 'تحصیلات نمی‌تواند خالی باشد' }),
  expertise: z
    .string({
      required_error: 'تخصص‌ها الزامی است',
      invalid_type_error: 'تخصص‌ها باید رشته باشد',
    })
    .min(1, { message: 'تخصص‌ها نمی‌تواند خالی باشد' }),
  projectDuration: z
    .string({
      required_error: 'مدت زمان پروژه الزامی است',
      invalid_type_error: 'مدت زمان پروژه باید رشته باشد',
    })
    .min(1, { message: 'مدت زمان پروژه نمی‌تواند خالی باشد' }),
  projectGoals: z
    .string({
      required_error: 'اهداف پروژه الزامی است',
      invalid_type_error: 'اهداف پروژه باید رشته باشد',
    })
    .min(1, { message: 'اهداف پروژه نمی‌تواند خالی باشد' }),
  projectImportance: z
    .string({
      required_error: 'اهمیت پروژه الزامی است',
      invalid_type_error: 'اهمیت پروژه باید رشته باشد',
    })
    .min(1, { message: 'اهمیت پروژه نمی‌تواند خالی باشد' }),
  technicalDetails: z
    .string({
      required_error: 'جزئیات فنی الزامی است',
      invalid_type_error: 'جزئیات فنی باید رشته باشد',
    })
    .min(1, { message: 'جزئیات فنی نمی‌تواند خالی باشد' }),
  productFeatures: z
    .string({
      required_error: 'ویژگی‌های محصول الزامی است',
      invalid_type_error: 'ویژگی‌های محصول باید رشته باشد',
    })
    .min(1, { message: 'ویژگی‌های محصول نمی‌تواند خالی باشد' }),
  similarProducts: z
    .string({
      required_error: 'محصولات مشابه الزامی است',
      invalid_type_error: 'محصولات مشابه باید رشته باشد',
    })
    .min(1, { message: 'محصولات مشابه نمی‌تواند خالی باشد' }),
  projectOutcomes: z
    .string({
      required_error: 'دستاوردهای پروژه الزامی است',
      invalid_type_error: 'دستاوردهای پروژه باید رشته باشد',
    })
    .min(1, { message: 'دستاوردهای پروژه نمی‌تواند خالی باشد' }),
  projectInnovation: z
    .string({
      required_error: 'نوآوری پروژه الزامی است',
      invalid_type_error: 'نوآوری پروژه باید رشته باشد',
    })
    .min(1, { message: 'نوآوری پروژه نمی‌تواند خالی باشد' }),
  projectRisks: z
    .string({
      required_error: 'ریسک‌های پروژه الزامی است',
      invalid_type_error: 'ریسک‌های پروژه باید رشته باشد',
    })
    .min(1, { message: 'ریسک‌های پروژه نمی‌تواند خالی باشد' }),
});

export type ProposalUpdateFormValues = z.infer<typeof proposalUpdateSchema>;
