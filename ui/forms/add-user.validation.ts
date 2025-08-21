import z from 'zod';

export const userFormSchema = z.object({
  username: z.string().min(3, 'نام کاربری باید حداقل ۳ کاراکتر باشد'),
  password: z.string().min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد'),
  user_type_id: z.number({ message: 'لطفا نوع کاربر را انتخاب کنید' }),
  fname: z.string().min(1, 'نام اجباری است'),
  lname: z.string().min(1, 'نام خانوادگی اجباری است'),
  father_name: z.string().min(1, 'نام پدر اجباری است'),
  birth: z.string().min(1, 'تاریخ تولد اجباری است'),
  resume_file_id: z.number().optional(),
  address: z.string().min(1, 'آدرس اجباری است'),
  phone: z.string().min(1, 'شماره تلفن اجباری است'),
  active: z.boolean(),
});

export type UserFormData = z.infer<typeof userFormSchema>;

export const userFormDefaultValues: UserFormData = {
  username: '',
  password: '',
  user_type_id: 0,
  fname: '',
  lname: '',
  father_name: '',
  birth: '',
  resume_file_id: undefined,
  address: '',
  phone: '',
  active: true,
};
