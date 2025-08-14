// schemas/commission-schema.ts
import { z } from 'zod';

export const addProjectTitleSchema = z.object({
  projectTitle: z.coerce.string({
    required_error: 'موضوع پروژه الزامی است',
  }),
  projectDescription: z.coerce.string({
    required_error: 'توضیحات پروژه الزامی است',
  }),
});

export type AddProjectTitleFormValues = z.infer<typeof addProjectTitleSchema>;
