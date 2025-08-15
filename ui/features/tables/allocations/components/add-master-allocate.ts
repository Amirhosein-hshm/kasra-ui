// schemas/commission-schema.ts
import { z } from 'zod';

export const addMasterAllocateSchema = z.object({
  firstName: z
    .string({
      required_error: 'نام الزامی است',
    })
    .trim()
    .min(1, 'نام استاد راهنما الزامی است'),
  lastName: z
    .string({
      required_error: 'نام خانوادگی الزامی است',
    })
    .trim()
    .min(1, 'فامیلی استاد راهنما الزامی است'),
});

export type AddMasterAllocateFormValues = z.infer<
  typeof addMasterAllocateSchema
>;
