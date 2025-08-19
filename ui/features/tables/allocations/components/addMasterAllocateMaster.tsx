import { Sidebar } from '@/ui/components/sidebar/sidebar';
import { AllocateResponse } from '@/lib/types';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '@/ui/components/input/input';
import { toast } from 'sonner';
import { useEditExplorerAllocate, useExplorerMasters } from '@/lib/hooks';
import {
  AddMasterAllocateFormValues,
  addMasterAllocateSchema,
} from './add-master-allocate';
import { FormSelect } from '@/ui/components/select/select';

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

  const { data: masters = [] } = useExplorerMasters({
    enabled: open,
    queryKey: ['broker-users'],
  });

  const { mutateAsync, isPending } = useEditExplorerAllocate();

  const onSubmit = async ({ masterId }: AddMasterAllocateFormValues) => {
    try {
      await mutateAsync({
        allocateId: selected?.id!,
        payload: {
          masterId: +masterId,
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
            <FormSelect
              name="masterId"
              label="استاد راهنما"
              options={masters.map((u) => ({
                value: u.id,
                label: `${u.name} `,
              }))}
            />
          </form>
        </div>
      </Sidebar>
    </FormProvider>
  );
}
