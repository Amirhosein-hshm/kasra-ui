import {
  useEditExplorerProposal,
  useExplorerUsersSupervisor,
  useUserProposal,
} from '@/lib/hooks';
import { ProposalResponse } from '@/lib/types';
import { FormSelect } from '@/ui/components/select/select';
import { Sidebar } from '@/ui/components/sidebar/sidebar';
import { useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { AssignProposalSupervisorSidebarSkeleton } from './loading/AssignProposalSupervisorSidebarSkeleton';
import { FileUpload } from '@/ui/components/file-upload';
import { useState } from 'react';
import { PersianDatePicker } from '@/ui/components/date-picker/date-picker';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CommissionFormValues,
  commissionSchema,
} from './commission-validation';
import { FormInput } from '@/ui/components/input/input';

interface ProposalSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selected?: ProposalResponse | null;
}

export function AssignSupervisorToProposalSidebar({
  open,
  onOpenChange,
  selected,
}: ProposalSidebarProps) {
  const { data, isLoading } = useUserProposal(selected?.id ?? 0, {
    enabled: !!selected?.id,
    queryKey: ['userProposal', selected?.id],
  });

  const queryClient = useQueryClient();

  const explorerUsersQ = useExplorerUsersSupervisor(open);
  const explorerForm = useForm<CommissionFormValues>({
    resolver: zodResolver(commissionSchema),
  });

  const [fileId, setFileId] = useState<number | null>(null);

  const onUploadComplete = (val: any) => {
    toast.success('فایل با موفقیت بارگذاری شد');
    setFileId(val.id);
  };

  const { mutateAsync, isPending } = useEditExplorerProposal();
  const handleSubmitExplorerForm = explorerForm.handleSubmit(
    ({ supervisorId, startAt, comment }) => {
      if (selected)
        mutateAsync({
          proposalId: selected.id,
          payload: {
            supervisorId,
            commissionFileId: fileId,
            commissionDateTime: startAt?.toISOString(),
            comment: comment ?? undefined,
          },
        })
          .then(() => {
            toast.success('تعیین ناظر انجام شد');
            onOpenChange(false);
            queryClient.invalidateQueries();
          })
          .catch(() => {
            toast.error('تعیین ناظر موفقیت آمیز نبود');
          });
    }
  );

  return (
    <FormProvider {...explorerForm}>
      <Sidebar
        open={open}
        onOpenChange={onOpenChange}
        title={`تعیین ناظر برای پروپوزال ${selected?.id ?? ''}`}
        description=""
        onSubmit={!!data?.supervisorId ? undefined : handleSubmitExplorerForm}
        isLoading={isPending}
      >
        {!isLoading ? (
          <form
            onSubmit={handleSubmitExplorerForm}
            className="flex flex-col gap-2"
          >
            <FormSelect
              name="supervisorId"
              label="تعیین ناظر"
              value={
                data?.supervisorId ? String(data?.supervisorId) : undefined
              }
              disabled={!!data?.supervisorId}
              options={explorerUsersQ.data?.map((u) => ({
                value: u.id,
                label: `${u.fname} ${u.lname}`,
              }))}
            />
            <FileUpload
              onUploadComplete={onUploadComplete}
              title="بارگذاری فایل برای کمیسیون"
            />
            <label>تاریخ برگذاری کمیسیون: </label>
            <PersianDatePicker
              initialValue={explorerForm.watch('startAt')}
              onChange={(date) => {
                explorerForm.setValue('startAt', date?.toDate());
              }}
              disabled={false}
            />
            <FormInput
              name="comment"
              label="توضیحات"
              placeholder="توضیحات خود را وارد کنید"
              multiline={true}
              rows={3}
            />
          </form>
        ) : (
          <AssignProposalSupervisorSidebarSkeleton />
        )}
      </Sidebar>
    </FormProvider>
  );
}
