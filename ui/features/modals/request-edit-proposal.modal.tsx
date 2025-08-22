import { useEditRequestExplorerProposal } from '@/lib/hooks';
import { ProposalResponse } from '@/lib/types';
import {
  EditRequestOnProposalFormValues,
  editRequestOnProposalSchema,
} from '@/lib/validations/edit-request-proposal.validation';
import { Button } from '@/ui/components/button';
import { FormInput } from '@/ui/components/input/input';
import Modal, { ModalProps } from '@/ui/components/modal/modal';
import { FormTextarea } from '@/ui/components/textarea/form-textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface Props extends ModalProps {
  proposalToEdit: ProposalResponse | null;
}

export default function RequestEditProposalModal({
  open,
  onOpenChange,
  proposalToEdit,
}: Props) {
  const form = useForm<EditRequestOnProposalFormValues>({
    resolver: zodResolver(editRequestOnProposalSchema),
  });

  const { mutateAsync, isPending } = useEditRequestExplorerProposal();
  const handleSubmit = form.handleSubmit(async (data) => {
    if (!proposalToEdit) return;

    mutateAsync({
      proposalId: proposalToEdit.id,
      comment: data.comment,
    })
      .then(() => {
        toast.success('درخواست اصلاح ارسال شد');
        onOpenChange(false);
      })
      .catch(() => {
        toast.error('درخواست اصلاح موفقیت آمیز نبود');
      });
  });

  return (
    <FormProvider {...form}>
      <Modal
        open={open}
        onOpenChange={onOpenChange}
        title="درخواست اصلاح پروپوزال"
        size="xl"
        disableOutsideClose
        showDefaultFooter={false}
        customFooter={
          <div className="flex w-full gap-2 justify-end">
            <Button
              className="w-20"
              loading={isPending}
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              لغو
            </Button>
            <Button
              className="w-20"
              loading={isPending}
              type="submit"
              onClick={handleSubmit}
            >
              تایید
            </Button>
          </div>
        }
      >
        <form onSubmit={handleSubmit}>
          <FormInput multiline name="comment" label="نظر" />
        </form>
      </Modal>
    </FormProvider>
  );
}
