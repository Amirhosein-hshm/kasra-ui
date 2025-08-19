// schemas/commission-schema.ts
import { z } from 'zod';

export const addMasterAllocateSchema = z.object({
  masterId: z
    .string({
      required_error: 'نام الزامی است',
    })
    .trim()
    .min(1, 'نام استاد راهنما الزامی است'),
});

export type AddMasterAllocateFormValues = z.infer<
  typeof addMasterAllocateSchema
>;
