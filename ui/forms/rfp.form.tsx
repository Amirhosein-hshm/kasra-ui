'use client';

import RFP from '@/lib/types/models/RFP';
import { useForm } from 'react-hook-form';
import { Input } from '@/ui/components/input';
import { Label } from '@/ui/components/label';
import { FileUpload } from '@/ui/components/file-upload';
import { Button } from '@/ui/components/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/ui/components/select';
import { useAddExplorerRfp } from '@/lib/hooks';

interface Props {
  rfpToUpdate?: RFP;
}

export default function RFPForm({ rfpToUpdate }: Props) {
  const form = useForm({
    defaultValues: rfpToUpdate,
  });

  const { mutateAsync } = useAddExplorerRfp();

  const handleSubmit = form.handleSubmit((data: RFP) => {
    // mutateAsync({info: data.info, })
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

      <div className="grid w-full mt-4 max-w-sm items-center gap-1.5">
        <Label htmlFor="title">دسته‌بندی</Label>
        <SelectCategory />
      </div>
      <FileUpload title="بارگذاری فایل RFP" />
      <Button loading={false}>ثبت</Button>
    </form>
  );
}

const SelectCategory = () => (
  <Select>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder="یک دسته‌بندی انتخاب کنید" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>دسته‌بندی</SelectLabel>
        <SelectItem value="کامپیوتر">کامپیوتر</SelectItem>
        <SelectItem value="مکانیک">مکانیک</SelectItem>
        <SelectItem value="پزشکی">پزشکی</SelectItem>
        <SelectItem value="برق">برق</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
);
