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
import { EditProposalSidebarSkeleton } from './loading/EditProposalSidebarSkeleto';
import { Button } from '@/ui/components/button';
import { AssignProposalSupervisorSidebarSkeleton } from './loading/AssignProposalSupervisorSidebarSkeleton';

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

  const explorerUsersQ = useExplorerUsersSupervisor();
  const explorerForm = useForm({
    defaultValues: {
      supervisor_id: -1,
    },
  });

  const { mutateAsync, isPending } = useEditExplorerProposal();
  const handleSubmitExplorerForm = explorerForm.handleSubmit((data) => {
    if (selected)
      mutateAsync({
        proposalId: selected.id,
        payload: {
          supervisorId: data.supervisor_id,
          // FIXME:
          comment: '',
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
  });

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
              name="supervisor_id"
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
          </form>
        ) : (
          <AssignProposalSupervisorSidebarSkeleton />
        )}
      </Sidebar>
    </FormProvider>
  );
}
