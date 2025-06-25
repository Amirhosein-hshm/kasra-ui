import { Button } from '@/ui/components/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/components/dialog';
import { FileUpload } from '@/ui/components/file-upload';
import { Input } from '@/ui/components/input';
import { Label } from '@/ui/components/label';
import { Slider } from '@/ui/components/slider';
import { Textarea } from '@/ui/components/textarea';
import { Controller, useForm } from 'react-hook-form';

export function UploadReportDialog() {
  const form = useForm({
    defaultValues: {
      progress: [0],
      description: '',
      wordFile: null,
      pdfFile: null,
      powerPointFile: null,
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Dialog>
      <form onSubmit={handleSubmit}>
        <DialogTrigger asChild>
          <Button variant="outline">بارگذاری گزارش‌کار</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>بارگذاری گزارش‌کار</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="progress">
                درصد پیشرفت: {form.watch('progress')[0]}%
              </Label>
              <Controller
                control={form.control}
                name="progress"
                render={({ field }) => (
                  <Slider
                    defaultValue={field.value}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={field.onChange}
                  />
                )}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">توضیحات</Label>
              <Textarea id="description" {...form.register('description')} />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="word">بارگذاری فایل word</Label>
              <Input id="word" type="file" {...form.register('wordFile')} />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="pdf">بارگذاری فایل pdf</Label>
              <Input id="pdf" type="file" {...form.register('pdfFile')} />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="powerpoint">بارگذاری فایل powerpoint</Label>
              <Input
                id="powerpoint"
                type="file"
                {...form.register('powerPointFile')}
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button variant="outline">لغو</Button>
            </DialogClose>
            <Button type="submit">ارسال</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
