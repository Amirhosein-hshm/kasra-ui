import {
  useAddBrokerCommission,
  useBrokerProposalCommissions,
  useBrokerUsersDiscoverer,
  useBrokerUsersMaster,
  useBrokerUsersSupervisor,
} from '@/lib/hooks';
import { Sidebar } from '@/ui/components/sidebar/sidebar';
import { useForm, FormProvider } from 'react-hook-form';
import { FormSelect } from '@/ui/components/select/select';
import { FormInput } from '@/ui/components/input/input';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  commissionSchema,
  CommissionFormValues,
} from './commission-validation';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ProposalAllResponse } from '@/lib/types';
import { useMeStore } from '@/lib/stores/me.stores';

interface ProposalSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selected?: ProposalAllResponse | null;
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

  const enumObject = useMeStore(
    (s) => s.user?.['stateCommission'] as Record<string, string>
  );

  const { mutateAsync, isPending } = useAddBrokerCommission();

  const queryClient = useQueryClient();

  const params = {};

  const { data: commissions = [] } = useBrokerProposalCommissions(
    selected?.id!,
    params,
    {
      queryKey: ['brokerProposalCommissions', selected?.id!, params],
      enabled: open,
    }
  );

  const onSubmit = async (data: CommissionFormValues) => {
    try {
      await mutateAsync({ ...data, proposalId: selected?.id ?? 0 });
      onOpenChange(false);
      queryClient.invalidateQueries({
        queryKey: ['brokerProposals'],
      });
      form.reset();
      toast.success('کمیسیون با موفقیت ایجاد شد');
    } catch (e) {
      toast.error('خطا در ایجاد کمیسیون');
    }
  };

  return (
    <FormProvider {...form}>
      <Sidebar
        open={open}
        onOpenChange={onOpenChange}
        title={`کمیسیون ${selected?.id ?? ''}`}
        description=""
        onSubmit={form.handleSubmit(onSubmit)}
        isLoading={isPending}
      >
        <div className=" flex flex-col gap-3">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormSelect
              name="state"
              placeholder="وضعیت را انتخاب کنید"
              label="وضعیت"
              enumKey="stateCommission"
            />
            <FormInput
              name="title"
              label="عنوان"
              placeholder="عنوان کمیسیون را وارد کنید"
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
              placeholder="توضیحات کمیسیون را وارد کنید"
              multiline
              rows={4}
            />
          </form>

          {commissions.length !== 0 && (
            <div className="flex flex-col gap-2 ">
              {commissions.map((commission) => (
                <div
                  className="flex flex-col text-[12px] border-[1px] border-stone-700 rounded-sm p-2"
                  key={commission.id}
                >
                  <div className=" flex justify-between items-center">
                    <div>
                      <span> کاشف: </span>
                      <span>
                        {commission.discoverer.fname}{' '}
                        {commission.discoverer.lname}
                      </span>
                    </div>
                    <span>{commission.id}</span>
                  </div>

                  <div>
                    <span> استاد راهنما: </span>
                    <span>
                      {commission.master.fname} {commission.master.lname}
                    </span>
                  </div>

                  <div>
                    <span> استاد راهنما: </span>
                    <span>
                      {commission.supervisor.fname}{' '}
                      {commission.supervisor.lname}
                    </span>
                  </div>

                  <div>
                    <span> توضیحات: </span>
                    <span>{commission.comment}</span>
                  </div>

                  <div>
                    <span> وضعیت: </span>
                    <span>{enumObject[commission.state]}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Sidebar>
    </FormProvider>
  );
}
