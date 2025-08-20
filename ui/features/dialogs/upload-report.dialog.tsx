'use client';

import { useAddUserReport } from '@/lib/hooks';
import { useUploadFile } from '@/lib/hooks/useFile';
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
import { Input } from '@/ui/components/input';
import { Label } from '@/ui/components/label';
import { Slider } from '@/ui/components/slider';
import { Textarea } from '@/ui/components/textarea/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { PropsWithChildren, useRef, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const formSchema = z.object({
  progress: z.tuple([
    z
      .number()
      .min(1, 'درصد پیشرفت باید بیشتر از ۰ باشد')
      .max(100, 'درصد پیشرفت باید کمتر مساوی از ۱۰۰ باشد'),
  ]),
  description: z.string().min(1, 'توضیحات الزامی است'),
  wordFile: z.any().refine((file) => file.length > 0, 'فایل Word الزامی است'),
  pdfFile: z.any().refine((file) => file.length > 0, 'فایل PDF الزامی است'),
  powerPointFile: z
    .any()
    .refine((file) => file.length > 0, 'فایل PowerPoint الزامی است'),
});

type FormValues = z.infer<typeof formSchema>;

interface Props {
  projectId: number;
}

export function UploadReportDialog({ projectId }: Props) {
  const dialogCloseRef = useRef<HTMLButtonElement>(null);
  const [isPending, setIsPending] = useState(false);
  const uploadPdfFile = useUploadFile({ mutationKey: ['pdf'] });
  const uploadWordFile = useUploadFile({ mutationKey: ['word'] });
  const uploadPPTXFile = useUploadFile({ mutationKey: ['pptx'] });
  const addReport = useAddUserReport();

  const queryClient = useQueryClient();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      progress: [0],
      description: '',
      wordFile: undefined,
      pdfFile: undefined,
      powerPointFile: undefined,
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    const ids = { word: null, pdf: null, powerpoint: null };
    setIsPending(true);
    Promise.all([
      uploadPdfFile.mutateAsync({ file: data.pdfFile[0] }).then((data) => {
        if (!data.id) throw new Error('Pdf file upload failed');

        ids.pdf = data.id;
      }),
      uploadWordFile.mutateAsync({ file: data.wordFile[0] }).then((data) => {
        if (!data.id) throw new Error('Word file upload failed');

        ids.word = data.id;
      }),
      uploadPPTXFile
        .mutateAsync({ file: data.powerPointFile[0] })
        .then((data) => {
          if (!data.id) throw new Error('Pptx file upload failed');

          ids.powerpoint = data.id;
        }),
      ,
    ])
      .then(() => {
        if (!ids.word || !ids.pdf || !ids.powerpoint) {
          toast.error('بارگذاری فایل ها موفقیت آمیز نبود');
          return;
        }

        // FIXME:
        addReport
          .mutateAsync({
            fileDocxId: ids.word,
            filePdfId: ids.pdf,
            filePptxId: ids.powerpoint,
            comment: '',
            title: data.description,
            anouncedPercent: data.progress[0],
            projectId,
          })
          .then(() => {
            queryClient
              .invalidateQueries
              // FIXME: target the exact query here
              ()
              .finally(() => {
                toast.success('گزارش بارگذاری شد');
                setIsPending(false);
                dialogCloseRef.current?.click();
              });
          })
          .catch(() => {
            toast.error('بارگذاری گزارش موفقیت آمیز نبود');
          });
      })
      .catch(() => {
        toast.error('بارگذاری فایل ها موفقیت آمیز نبود');
      })
      .finally(() => {
        setIsPending(false);
      });
  });

  return (
    <FormProvider {...form}>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">بارگذاری گزارش‌کار</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <DialogHeader>
              <DialogTitle>بارگذاری گزارش‌کار</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="progress">
                  <span>درصد پیشرفت: {form.watch('progress')[0]}%</span>
                  {(form?.formState?.errors?.progress as any)?.map((item) => (
                    <ErrorMessage key={item?.message}>
                      {item?.message}
                    </ErrorMessage>
                  ))}
                </Label>
                <Controller
                  control={form.control}
                  rules={{
                    required: true,
                  }}
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
                <Label htmlFor="description">
                  <span>توضیحات</span>
                  <ErrorMessage>
                    {form.formState.errors.description?.message}
                  </ErrorMessage>
                </Label>
                <Textarea
                  id="description"
                  {...form.register('description', { required: true })}
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="word">
                  <span>بارگذاری فایل word</span>
                  <ErrorMessage>
                    {form.formState.errors.wordFile?.message?.toString()}
                  </ErrorMessage>
                </Label>
                <Input
                  id="word"
                  type="file"
                  accept=".doc,.docx"
                  {...form.register('wordFile', { required: true })}
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="pdf">
                  <span>بارگذاری فایل pdf</span>
                  <ErrorMessage>
                    {form.formState.errors.pdfFile?.message?.toString()}
                  </ErrorMessage>
                </Label>
                <Input
                  id="pdf"
                  type="file"
                  accept=".pdf"
                  {...form.register('pdfFile', { required: true })}
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="powerpoint">
                  <span>بارگذاری فایل powerpoint</span>
                  <ErrorMessage>
                    {form.formState.errors.powerPointFile?.message?.toString()}
                  </ErrorMessage>
                </Label>
                <Input
                  id="powerpoint"
                  type="file"
                  accept=".ppt,.pptx"
                  {...form.register('powerPointFile', { required: true })}
                />
              </div>
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button variant="outline" type="button" ref={dialogCloseRef}>
                  لغو
                </Button>
              </DialogClose>
              <Button loading={isPending} type="submit">
                ارسال
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
}

const ErrorMessage = ({ children }: PropsWithChildren) => (
  <span className="text-red-400 text-xs font-light">{children}</span>
);
