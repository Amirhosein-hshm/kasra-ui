import { useEditProposalAndCreateProject } from '@/lib/hooks';
import { ProposalResponse } from '@/lib/types';
import { Button } from '@/ui/components/button';
import Modal, { ModalProps } from '@/ui/components/modal/modal';
import { toast } from 'sonner';

interface Props extends ModalProps {
  proposalToAccept: ProposalResponse | null;
}

export default function AcceptProposalModal({
  open,
  onOpenChange,
  proposalToAccept,
}: Props) {
  const { mutateAsync, isPending } = useEditProposalAndCreateProject();
  const handleSubmitEditProposalAndCreateProject = async (accept: boolean) => {
    if (!proposalToAccept) return;

    mutateAsync({
      proposalId: proposalToAccept.id,
      accept,
    })
      .then(() => {
        toast.success(`پروپوزال ${accept ? 'تایید' : 'رد'} شد`);
        onOpenChange(false);
      })
      .catch(() => {
        toast.error('تایید پروپوزال موفقیت آمیز نبود');
      });
  };

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={`تایید پروپوزال ${proposalToAccept?.id}`}
      size="xl"
      disableOutsideClose
      showDefaultFooter={false}
      customFooter={
        <div className="flex w-full gap-2 justify-end">
          <Button
            className="w-20"
            loading={isPending}
            variant="outline"
            onClick={() => handleSubmitEditProposalAndCreateProject(false)}
          >
            رد
          </Button>
          <Button
            className="w-20"
            loading={isPending}
            onClick={() => handleSubmitEditProposalAndCreateProject(true)}
          >
            تایید
          </Button>
        </div>
      }
    >
      این پروپوزال را تایید میکنید؟
    </Modal>
  );
}
