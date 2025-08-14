import { Sidebar } from '@/ui/components/sidebar/sidebar';
import { AllocateResponse } from '@/lib/types';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '@/ui/components/input/input';
import {
  AddProjectTitleFormValues,
  addProjectTitleSchema,
} from './add-project-validation';
import { toast } from 'sonner';
import { useEditUserAllocate } from '@/lib/hooks';

interface AddProjectTitleSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selected?: AllocateResponse | null;
}

export function AddProjectTitleSideBar({
  open,
  onOpenChange,
  selected,
}: AddProjectTitleSidebarProps) {
  const form = useForm<AddProjectTitleFormValues>({
    resolver: zodResolver(addProjectTitleSchema),
  });

  const handleClose = () => {
    onOpenChange(false);
    form.reset();
  };

  const { mutateAsync, isPending } = useEditUserAllocate();

  const onSubmit = async (data: AddProjectTitleFormValues) => {
    try {
      await mutateAsync({
        allocateId: selected?.id!,
        data,
      });
      handleClose();
      toast.success('موضوع پروژه با موفقیت ثبت شد');
    } catch (e) {
      toast.error('خطا در ثبت موضوع پروژه');
    }
  };

  return (
    <FormProvider {...form}>
      <Sidebar
        open={open}
        onOpenChange={handleClose}
        title={`تخصیص RFP ${selected?.id ?? ''}`}
        description=""
        isLoading={isPending}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className=" flex flex-col gap-3">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              name="projectTitle"
              label="موضوع پروژه"
              placeholder="موضوع پروژه را بنویسید"
            />
            <FormInput
              name="projectDescription"
              label="توضیحات"
              placeholder="نوضیحات"
              multiline
              rows={4}
            />
          </form>
        </div>
      </Sidebar>
    </FormProvider>
  );
}
