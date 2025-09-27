import z from 'zod';

export const changePasswordFormSchema = z.object({
  password: z.string().min(6, 'رمزعبور باید حداقل ۶ کاراکتر باشد'),
  passwordRepeat: z.string().min(6, 'تکرار رمزعبور باید حداقل ۶ کاراکتر باشد'),
});

export type ChangePasswordFormData = z.infer<typeof changePasswordFormSchema>;

export const changePasswordFormDefaultValues: ChangePasswordFormData = {
  password: '',
  passwordRepeat: '',
};
