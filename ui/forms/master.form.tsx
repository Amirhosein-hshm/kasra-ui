'use client';

import { Input } from '@/ui/components/input';
import { Label } from '@/ui/components/label';
import { useFormContext } from 'react-hook-form';
import { MasterFormData } from './master-form.validation';

interface Props {
  onSubmit: (data: MasterFormData) => Promise<void>;
}

export default function MasterForm({ onSubmit }: Props) {
  const form = useFormContext<MasterFormData>();

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="max-w-md mx-auto bg-white rounded-lg shadow-md"
    >
      <div className="grid gap-4">
        <div className="grid gap-1.5">
          <Label htmlFor="mastername">نام استاد راهنما</Label>
          <Input
            id="mastername"
            placeholder="نام استاد راهنما را وارد کنید"
            {...form.register('name')}
          />
        </div>
      </div>
    </form>
  );
}
