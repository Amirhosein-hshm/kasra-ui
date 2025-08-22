import { useAdminDeleteUser } from '@/lib/hooks/useAdmin';
import { UserInfoResponse } from '@/lib/types';
import { getFullName } from '@/lib/utils';
import { Button } from '@/ui/components/button';
import Modal, { ModalProps } from '@/ui/components/modal/modal';
import { toast } from 'sonner';

interface Props extends ModalProps {
  userToDelete?: UserInfoResponse;
}

export default function DeleteUserModal({
  open,
  onOpenChange,
  userToDelete,
}: Props) {
  const mutation = useAdminDeleteUser({
    onError(error, variables, context) {
      toast.error('حذف کاربر موفقیت آمیز نبود');
    },
    onSuccess(data, variables, context) {
      toast.success('کاربر حذف شد');
      onOpenChange(false);
    },
  });

  function handleDelete() {
    if (userToDelete) mutation.mutateAsync({ userId: userToDelete.id });
  }

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="حذف کاربر"
      size="xl"
      disableOutsideClose
      showDefaultFooter={false}
      customFooter={
        <div className="flex w-full gap-2 justify-end">
          <Button
            className="w-20"
            loading={mutation.isPending}
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            لغو
          </Button>
          <Button
            variant="destructive"
            className="w-20"
            loading={mutation.isPending}
            onClick={handleDelete}
          >
            بله
          </Button>
        </div>
      }
    >
      آیا از حذف {userToDelete ? getFullName(userToDelete) : ''} اطمینان دارید؟
    </Modal>
  );
}
