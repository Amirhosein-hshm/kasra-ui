'use client';

import { useLogin } from '@/lib/hooks/useAuthenticaton';
import { Button } from '@/ui/components/button';
import { Input } from '@/ui/components/input';
import { Label } from '@/ui/components/label';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BodyLoginTokenPost } from '@/lib/types';

interface Props {
  onSuccess: () => void;
}

export default function LoginForm({ onSuccess }: Props) {
  const [formIsSubmitting, setFormIsSubmitting] = useState(false);
  const form = useForm<BodyLoginTokenPost>();

  // Test cookie functionality on mount

  const { mutateAsync, isPending } = useLogin();

  const handleSubmit = form.handleSubmit(async (data: BodyLoginTokenPost) => {
    try {
      await mutateAsync({
        username: data.username,
        password: data.password,
        grantType: 'password',
      });
      onSuccess();
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setFormIsSubmitting(false);
    }
  });

  return (
    <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="username">نام کاربری</Label>
        <Input
          id="username"
          placeholder="نام کاربری"
          {...form.register('username', {
            required: true,
          })}
        />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="password">گذرواژه</Label>
        <Input
          id="password"
          type="password"
          placeholder="گذرواژه"
          {...form.register('password', {
            required: true,
          })}
        />
      </div>

      <Button
        type="submit"
        className="mt-[22px] font-[vazir-medium]"
        loading={isPending}
        disabled={formIsSubmitting}
      >
        ورود
      </Button>
    </form>
  );
}
