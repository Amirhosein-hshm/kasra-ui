// schemas/commission-schema.ts
import { z } from 'zod';

export const allocationSchema = z.object({
  allocatedToUserId: z.coerce.number({
    required_error: 'کارجو الزامی است',
    invalid_type_error: 'کارجو نامعتبر است',
  }),
});

export type AllocationFormValues = z.infer<typeof allocationSchema>;
