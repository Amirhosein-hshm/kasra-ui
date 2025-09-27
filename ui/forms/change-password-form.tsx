'use client';

import { UserInfoResponse } from '@/lib/types';
import { Button } from '@/ui/components/button';
import { Input } from '@/ui/components/input';
import { Label } from '@/ui/components/label';
import { useFormContext } from 'react-hook-form';
import { ChangePasswordFormData } from './change-password.validation';

interface Props {
  userToUpdate?: UserInfoResponse;
  onSubmit: (data: ChangePasswordFormData) => Promise<void>;
  isPending: boolean;
}

export default function ChangePasswordForm({ onSubmit, isPending }: Props) {
  const form = useFormContext<ChangePasswordFormData>();

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="max-w-md mx-auto rounded-lg shadow-md flex flex-col gap-2 p-2"
    >
      <div className="grid gap-1.5">
        <Label htmlFor="password">رمزعبور جدید</Label>
        <Input
          id="password"
          placeholder="رمزعبور جدید را وارد کنید"
          {...form.register('password')}
        />
        {form.formState.errors.password && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="passwordRepeat">رمزعبور جدید</Label>
        <Input
          id="passwordRepeat"
          placeholder="رمزعبور جدید را وارد کنید"
          {...form.register('passwordRepeat')}
        />
        {form.formState.errors.passwordRepeat && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.passwordRepeat.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full mt-6" loading={isPending}>
        تایید
      </Button>
    </form>
  );
}
