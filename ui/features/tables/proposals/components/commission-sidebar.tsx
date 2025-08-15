import { useMeStore } from '@/lib/stores/me.stores';
import { ProposalResponse } from '@/lib/types';
import { FormInput } from '@/ui/components/input/input';
import { FormSelect } from '@/ui/components/select/select';
import { Sidebar } from '@/ui/components/sidebar/sidebar';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  CommissionFormValues,
  commissionSchema,
} from './commission-validation';

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
  const form = useForm<CommissionFormValues>({
    resolver: zodResolver(commissionSchema),
  });

  const enumObject = useMeStore(
    (s) => s.user?.['stateCommission'] as Record<string, string>
  );

  const queryClient = useQueryClient();

  const params = {};

  const onSubmit = async (data: CommissionFormValues) => {
    try {
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
        // isLoading={isPending}
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
            {/* <FormSelect
              name="userMasterId"
              label="مدیر"
              options={master.map((u) => ({
                value: u.id,
                label: `${u.fname} ${u.lname}`,
              }))}
            /> */}
            {/* <FormSelect
              name="userDiscovererId"
              label="کاشف"
              options={discoverer.map((u) => ({
                value: u.id,
                label: `${u.fname} ${u.lname}`,
              }))}
            /> */}
            {/* <FormSelect
              name="userSupervisorId"
              label="ناظر"
              options={supervisor.map((u) => ({
                value: u.id,
                label: `${u.fname} ${u.lname}`,
              }))}
            /> */}
            <FormInput
              name="comment"
              label="توضیحات"
              placeholder="توضیحات کمیسیون را وارد کنید"
              multiline
              rows={4}
            />
          </form>

          {/* {commissions.length !== 0 && (
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
          )} */}
        </div>
      </Sidebar>
    </FormProvider>
  );
}
