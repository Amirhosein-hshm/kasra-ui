import { useAddAllocate, useBrokerUsers } from '@/lib/hooks';
import { Sidebar } from '@/ui/components/sidebar/sidebar';
import { RFPResponse } from '@/lib/types';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormSelect } from '@/ui/components/select/select';
import {
  allocationSchema,
  AllocationFormValues,
} from './allocation-validation';
import { toast } from 'sonner';

interface RfpSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selected?: RFPResponse | null;
}

export function RFPAllocationSideBar({
  open,
  onOpenChange,
  selected,
}: RfpSidebarProps) {
  const form = useForm<AllocationFormValues>({
    resolver: zodResolver(allocationSchema),
  });

  const { data: users = [] } = useBrokerUsers({
    enabled: open,
    queryKey: ['broker-users'],
  });

  const { mutateAsync, isPending } = useAddAllocate();

  const onSubmit = async (data: AllocationFormValues) => {
    try {
      await mutateAsync({
        allocatedToUserId: data.allocatedToUserId,
        // @ts-ignore
        RFP_id: selected?.id!,
      });
      onOpenChange(false);
      form.reset();
      toast.success('rfp با موفقیت تخصیص یافت');
    } catch (e) {
      toast.error('خطا در تخصیص');
    }
  };

  return (
    <FormProvider {...form}>
      <Sidebar
        open={open}
        onOpenChange={onOpenChange}
        title={`تخصیص RFP ${selected?.id ?? ''}`}
        description=""
        isLoading={isPending}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className=" flex flex-col gap-3">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormSelect
              name="allocatedToUserId"
              label="کارجو"
              options={users.map((u) => ({
                value: u.id,
                label: `${u.fname} ${u.lname}`,
              }))}
            />
          </form>
        </div>
      </Sidebar>
    </FormProvider>
  );
}
