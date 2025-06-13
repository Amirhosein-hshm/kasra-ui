'use client';

import { useForm } from 'react-hook-form';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/components/avatar';
import { Input } from '@/ui/components/input';
import clsx from 'clsx';

export default function ProfileForm() {
  const form = useForm();

  const handleSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={clsx(
          'flex flex-col gap-4',
          'max-lg:w-full max-lg:items-center',
          'w-80'
        )}
      >
        <Avatar className="w-40 h-40">
          <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
        </Avatar>

        <Input type="file" title="" />
      </div>
    </form>
  );
}
