import {
  useAddBrokerCommission,
  useBrokerUsersDiscoverer,
  useBrokerUsersMaster,
  useBrokerUsersSupervisor,
} from '@/lib/hooks';
import { Sidebar } from '@/ui/components/sidebar/sidebar';
import { ProposalResponse } from 'lib/types/proposalResponse';
import { useForm, FormProvider } from 'react-hook-form';
import { FormSelect } from '@/ui/components/select/select';
import { FormInput } from '@/ui/components/input/input';
import { useMeStore } from '@/lib/stores/me.stores';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  commissionSchema,
  CommissionFormValues,
} from './commission-validation';
import { useQueryClient } from '@tanstack/react-query';

interface ProposalSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selected?: ProposalResponse | null;
}

export function CommissionSideBar({
  open,
  onOpenChange,
  selected,
}: ProposalSidebarProps) {
  const { data: master = [] } = useBrokerUsersMaster({
    enabled: open,
    queryKey: ['broker-users-master'],
  });

  const { data: discoverer = [] } = useBrokerUsersDiscoverer({
    enabled: open,
    queryKey: ['broker-users-discoverer'],
  });

  const { data: supervisor = [] } = useBrokerUsersSupervisor({
    enabled: open,
    queryKey: ['broker-users-supervisor'],
  });

  const form = useForm<CommissionFormValues>({
    resolver: zodResolver(commissionSchema),
  });

  const { mutateAsync, isPending } = useAddBrokerCommission();

  const queryClient = useQueryClient();

  const onSubmit = (data: CommissionFormValues) => {
    try {
      mutateAsync({ ...data, proposalId: selected?.id ?? 0 });
      onOpenChange(false);
      queryClient.invalidateQueries({
        queryKey: ['brokerProposals'],
      });
    } catch (e) {
      console.log(e);
      //
    }
  };

  const state = useMeStore((s) => s.user?.state);

  return (
    <FormProvider {...form}>
      <Sidebar
        open={open}
        onOpenChange={onOpenChange}
        title={`کومیسیون ${selected?.id ?? ''}`}
        description=""
        onSubmit={form.handleSubmit(onSubmit)}
        isLoading={isPending}
      >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormSelect
            name="state"
            placeholder="وضعیت را انتخاب کنید"
            label="وضعیت"
            enumKey="state"
          />
          <FormInput
            name="title"
            label="عنوان"
            placeholder="عنوان کومیسیون را وارد کنید"
          />
          <FormSelect
            name="userMasterId"
            label="مدیر"
            options={master.map((u) => ({
              value: u.id,
              label: `${u.fname} ${u.lname}`,
            }))}
          />
          <FormSelect
            name="userDiscovererId"
            label="کاشف"
            options={discoverer.map((u) => ({
              value: u.id,
              label: `${u.fname} ${u.lname}`,
            }))}
          />
          <FormSelect
            name="userSupervisorId"
            label="ناظر"
            options={supervisor.map((u) => ({
              value: u.id,
              label: `${u.fname} ${u.lname}`,
            }))}
          />
          <FormInput
            name="comment"
            label="توضیحات"
            placeholder="توضیحات کومیسیون را وارد کنید"
            multiline
            rows={4}
          />
        </form>
      </Sidebar>
    </FormProvider>
  );
}
