'use client';

import { Button } from '@/ui/components/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/ui/components/input-otp';
import { Label } from '@/ui/components/label';
import { useForm } from 'react-hook-form';

export default function OtpForm() {
  const form = useForm();

  const handleSubmit = form.handleSubmit((data: any) => {
    console.log(data);
  });

  return (
    <form
      className="h-full flex flex-wrap items-center gap-[24px]"
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

      <Button type="submit" className="w-full font-[vazir-medium] self-end">
        ورود
      </Button>
    </form>
  );
}
