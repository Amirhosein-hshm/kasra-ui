'use client';

import { Button } from '@/ui/components/button';
import { Input } from '@/ui/components/input';
import { Label } from '@/ui/components/label';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  onSetStep: Dispatch<SetStateAction<'login' | 'otp'>>;
}

export default function LoginForm({ onSetStep }: Props) {
  const form = useForm();

  const handleSubmit = form.handleSubmit((data: any) => {
    console.log(data);
    onSetStep('otp');
  });

  return (
    <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="national-code">کد ملی</Label>
        <Input
          id="national-code"
          placeholder="کد ملی"
          {...form.register('national_code', {
            required: true,
            maxLength: 10,
            minLength: 10,
          })}
        />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="phone">شماره همراه</Label>
        <Input
          id="phone"
          placeholder="شماره همراه"
          {...form.register('phone', {
            required: true,
            maxLength: 11,
            minLength: 11,
          })}
        />
      </div>

      <Button type="submit" className="mt-[22px] font-[vazir-medium]">
        ارسال کد
      </Button>
    </form>
  );
}
