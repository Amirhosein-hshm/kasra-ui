import { z } from 'zod';

export const rfpRequestSchema = z.object({
  // Basic Information
  info: z
    .string({
      required_error: 'عنوان الزامی است',
      invalid_type_error: 'عنوان باید رشته باشد',
    })
    .min(1, { message: 'عنوان نمی‌تواند خالی باشد' }),

  RFP_field_id: z.coerce
    .number({
      required_error: 'فیلد RFP الزامی است',
      invalid_type_error: 'شناسه فیلد RFP نامعتبر است',
    })
    .min(1, { message: 'فیلد RFP باید انتخاب شود' }),

  // Stakeholders
  beneficiary: z
    .string({
      required_error: 'ذینفع الزامی است',
      invalid_type_error: 'ذینفع باید رشته باشد',
    })
    .min(1, { message: 'ذینفع نمی‌تواند خالی باشد' }),

  representative: z
    .string({
      required_error: 'نماینده الزامی است',
      invalid_type_error: 'نماینده باید رشته باشد',
    })
    .min(1, { message: 'نماینده نمی‌تواند خالی باشد' }),

  // Issue Details
  issue_title: z
    .string({
      required_error: 'عنوان مسئله الزامی است',
      invalid_type_error: 'عنوان مسئله باید رشته باشد',
    })
    .min(1, { message: 'عنوان مسئله نمی‌تواند خالی باشد' }),

  issue_description: z
    .string({
      required_error: 'توضیحات مسئله الزامی است',
      invalid_type_error: 'توضیحات مسئله باید رشته باشد',
    })
    .min(1, { message: 'توضیحات مسئله نمی‌تواند خالی باشد' }),

  // Categorization
  mission_area: z
    .string({
      required_error: 'حوزه ماموریت الزامی است',
      invalid_type_error: 'حوزه ماموریت باید رشته باشد',
    })
    .min(1, { message: 'حوزه ماموریت نمی‌تواند خالی باشد' }),

  specialty_field: z
    .string({
      required_error: 'رشته تخصصی الزامی است',
      invalid_type_error: 'رشته تخصصی باید رشته باشد',
    })
    .min(1, { message: 'رشته تخصصی نمی‌تواند خالی باشد' }),

  issue_origin: z.string(),

  // Execution & Financial
  proposed_execution_path: z.string(),
  frequency: z.string(),
  financial_value: z.string(),
  // Requirements & Constraints
  key_requirements: z.string(),
  limitations: z.string(),
  // Technical Details
  technical_solution: z.string(),
  related_projects: z.string(),
  proposed_product: z.string(),
  // Support & Evaluation
  issue_support: z.string(),
  analyst_evaluator: z.string(),
  // Metadata
  keywords: z.string(),
  fileId: z.number().optional(),
});

export type RFPFormValues = z.infer<typeof rfpRequestSchema>;
