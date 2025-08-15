import { Sidebar } from '@/ui/components/sidebar/sidebar';
import { AllocateResponse } from '@/lib/types';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '@/ui/components/input/input';
import { toast } from 'sonner';
import { useEditExplorerAllocate } from '@/lib/hooks';
import {
  AddMasterAllocateFormValues,
  addMasterAllocateSchema,
} from './add-master-allocate';

interface AddMasterAllocateSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selected?: AllocateResponse | null;
}

export function AddMasterAllocateSideBar({
  open,
  onOpenChange,
  selected,
}: AddMasterAllocateSidebarProps) {
  const form = useForm<AddMasterAllocateFormValues>({
    resolver: zodResolver(addMasterAllocateSchema),
  });

  const handleClose = () => {
    onOpenChange(false);
    form.reset();
  };

  const { mutateAsync, isPending } = useEditExplorerAllocate();

  const onSubmit = async (data: AddMasterAllocateFormValues) => {
    try {
      await mutateAsync({
        allocateId: selected?.id!,
        payload: {
          master: data.firstName! + data.lastName!,
        },
      });
      handleClose();
      toast.success('استاد راهنما با موفقیت اضافه شد');
    } catch (e) {
      toast.error('خطا در درج استاد راهنما');
    }
  };

  return (
    <FormProvider {...form}>
      <Sidebar
        open={open}
        onOpenChange={handleClose}
        title={`افزودن استاد راهنما`}
        description=""
        isLoading={isPending}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className=" flex flex-col gap-3">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              name="firstName"
              label="نام استاد راهنما"
              placeholder="نام استاد راهنما"
            />
            <FormInput
              name="lastName"
              label="فامیلی استاد راهنما"
              placeholder="فامیلی استاد راهنما"
            />
          </form>
        </div>
      </Sidebar>
    </FormProvider>
  );
}
