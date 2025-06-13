'use client';

import RFP from '@/lib/types/models/RFP';
import { useForm } from 'react-hook-form';
import { Input } from '@/ui/components/input';
import { Label } from '@/ui/components/label';
import { FileUpload } from '@/ui/components/file-upload';

interface Props {
  rfpToUpdate?: RFP;
}

export default function RFPForm({ rfpToUpdate }: Props) {
  const form = useForm({
    defaultValues: rfpToUpdate,
  });

  const handleSubmit = form.handleSubmit((data: RFP) => {
    console.log(data);
  });

  return (
    <form onSubmit={handleSubmit} className="my-10">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="title">عنوان RFP</Label>
        <Input
          id="title"
          placeholder="..."
          {...form.register('info', {
            required: true,
            maxLength: 10,
            minLength: 10,
          })}
        />
      </div>

      <FileUpload title="بارگذاری فایل RFP" />
    </form>
  );
}
