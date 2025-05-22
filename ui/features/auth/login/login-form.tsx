'use client';

import { Button } from '@/ui/components/button';
import { Input } from '@/ui/components/input';
import { Label } from '@/ui/components/label';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  onSuccess: () => void;
}

export default function LoginForm({ onSuccess }: Props) {
  const [formIsSubmitting, setFormIsSubmitting] = useState(false);
  const form = useForm();

  const handleSubmit = form.handleSubmit((data: any) => {
    console.log(data);
    setFormIsSubmitting(true);
    setTimeout(() => {
      onSuccess();
      setFormIsSubmitting(false);
    }, 2000);
  });

  return (
    <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="national-code">کد ملی</Label>
        <Input
          id="national-code"
          placeholder="1234567890"
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
          placeholder="09000000000"
          {...form.register('phone', {
            required: true,
            maxLength: 11,
            minLength: 11,
          })}
        />
      </div>

      <Button
        type="submit"
        className="mt-[22px] font-[vazir-medium]"
        loading={formIsSubmitting}
      >
        ارسال کد
      </Button>
    </form>
  );
}
