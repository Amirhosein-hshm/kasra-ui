import z from 'zod';

export const masterFormSchema = z.object({
  name: z.string().min(3, 'نام کاربری باید حداقل ۳ کاراکتر باشد'),
});

export type MasterFormData = z.infer<typeof masterFormSchema>;

export const masterFormDefaultValues: MasterFormData = {
  name: '',
};
