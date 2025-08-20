import { useEditSupervisorReport } from '@/lib/hooks';
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
import { Label } from '@/ui/components/label';
import { Slider } from '@/ui/components/slider';
import { Textarea } from '@/ui/components/textarea/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { PropsWithChildren, useRef, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const getFormSchema = (max: number = 100) =>
  z.object({
    progress: z.tuple([
      z
        .number()
        .min(1, 'درصد پیشرفت باید بیشتر از ۰ باشد')
        .max(max, `درصد پیشرفت باید کمتر مساوی از ${max} باشد`),
    ]),
    comment: z.string().min(1, 'توضیحات الزامی است'),
  });
type FormValues = z.infer<ReturnType<typeof getFormSchema>>;

interface Props {
  reportID: number;
  announcedPercentage: number;
  acceptedPercentage: number;
}

export default function CommentOnReportDialog({
  reportID,
  announcedPercentage,
  acceptedPercentage,
}: Props) {
  const dialogCloseRef = useRef<HTMLButtonElement>(null);
  const [mode, setMode] = useState<'approve' | 'reject'>();
  const [isPending, setIsPending] = useState(false);
  const updateReport = useEditSupervisorReport();

  const queryClient = useQueryClient();

  const form = useForm<FormValues>({
    resolver: zodResolver(getFormSchema(announcedPercentage)),
    defaultValues: {
      progress: [0],
      comment: '',
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    setIsPending(true);
    updateReport
      .mutateAsync({
        reportId: reportID,
        data: {
          comment: data.comment,
          acceptedPercent: data.progress[0],
          // FIXME:
          commissionDateTime: new Date().toISOString(),
        },
      })
      .then(() => {
        queryClient.invalidateQueries();
        toast.success(`گزارش  ${mode === 'approve' ? 'تایید' : 'رد'} شد`);
        dialogCloseRef.current?.click();
      })
      .catch(() => {
        toast.error(
          `${mode === 'approve' ? 'تایید' : 'رد'} گزارش موفقیت آمیز نبود`
        );
      })
      .finally(() => {
        setIsPending(false);
        form.reset();
      });
  });

  return (
    <FormProvider {...form}>
      <Dialog>
        <div className="flex gap-2">
          <DialogTrigger>
            <Button asChild onClick={() => setMode('approve')}>
              تایید گزارش‌کار
            </Button>
          </DialogTrigger>
          <DialogTrigger>
            <Button
              asChild
              onClick={() => {
                form.setValue('progress', [acceptedPercentage]);
                setMode('reject');
              }}
              variant="destructive"
            >
              رد گزارش‌کار
            </Button>{' '}
          </DialogTrigger>
        </div>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <DialogHeader>
              <DialogTitle>
                {mode === 'approve' ? 'تایید گزارش‌کار' : 'رد گزارش‌کار'}
              </DialogTitle>
            </DialogHeader>

            <div className="Main flex flex-col gap-4">
              {mode === 'approve' && (
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
              )}

              <div className="grid gap-3">
                <Label htmlFor="comment">
                  <span>نظر</span>
                  <ErrorMessage>
                    {form.formState.errors.comment?.message}
                  </ErrorMessage>
                </Label>
                <Textarea
                  id="comment"
                  {...form.register('comment', { required: true })}
                />
              </div>
            </div>

            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button variant="outline" type="button" ref={dialogCloseRef}>
                  لغو
                </Button>
              </DialogClose>
              <Button
                loading={isPending}
                type="submit"
                variant={mode === 'reject' ? 'destructive' : 'default'}
              >
                {mode === 'reject' ? 'رد گزارش‌کار' : 'تایید گزارش‌کار'}
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
