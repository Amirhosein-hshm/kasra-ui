'use client';

import { PATHS } from '@/lib/constants/PATHS';
import { useAuthStore } from '@/lib/stores/auth-store';
import { Button } from '@/ui/components/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/ui/components/input-otp';
import { Label } from '@/ui/components/label';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function OtpForm() {
  const router = useRouter();
  const form = useForm();
  const [formIsSubmitting, setFormIsSubmitting] = useState(false);

  const { login } = useAuthStore();

  const handleSubmit = form.handleSubmit((data: any) => {
    console.log(data);
    setFormIsSubmitting(true);
    setTimeout(() => {
      login();
      setFormIsSubmitting(false);
      router.push(PATHS.general.dashboard);
    }, 2000);
  });

  return (
    <form
      className="h-full flex flex-wrap items-end gap-[24px]"
      onSubmit={handleSubmit}
    >
      <div
        dir="ltr"
        className="w-full h-fit flex flex-col items-end gap-[16px]"
      >
        <Label>:کد ارسالی</Label>

        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <Button
        type="submit"
        className="w-full font-[vazir-medium] self-end"
        loading={formIsSubmitting}
      >
        ورود
      </Button>
    </form>
  );
}
