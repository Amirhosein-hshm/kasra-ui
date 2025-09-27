import {
  useAdminUpdateUser,
  useAdminUserRoles,
  useChangePassword,
} from '@/lib/hooks/useAdmin';
import { UserInfoResponse } from '@/lib/types';
import Spinner from '@/ui/common/spinner';
import { Sidebar } from '@/ui/components/sidebar/sidebar';
import ChangePasswordForm from '@/ui/forms/change-password-form';
import {
  ChangePasswordFormData,
  changePasswordFormDefaultValues,
  changePasswordFormSchema,
} from '@/ui/forms/change-password.validation';
import EditUserForm from '@/ui/forms/edit-user.form';
import {
  EditUserFormData,
  editUserFormDefaultValues,
  editUserFormSchema,
} from '@/ui/forms/edit-user.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface ChangePasswordSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userToUpdate?: UserInfoResponse;
}

export function ChangePasswordSidebar({
  open,
  onOpenChange,
  userToUpdate,
}: ChangePasswordSidebarProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: changePasswordFormDefaultValues,
  });

  const updatePasswordMutation = useChangePassword();

  const handleSubmit = async (data: ChangePasswordFormData) => {
    setIsLoading(true);
    if (!userToUpdate) {
      toast.error('مشکلی پیش آمده، لطفا دوباره امتحان کنید');
      return;
    }
    if (data.password !== data.passwordRepeat) {
      toast.warning('تکرار رمزعبور منطبق با رمزعبور نیست');
      return;
    }
    try {
      await updatePasswordMutation.mutateAsync({
        userId: userToUpdate?.id,
        password: data.password,
      });

      toast.success('رمزعبور با موفقیت تغییر کرد');
      onOpenChange(false);
    } catch (error) {
      console.error('خطا در ارسال فرم:', error);
      toast.error('خطایی رخ داد');
    } finally {
      form.reset();
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...form}>
      <Sidebar
        open={open}
        onOpenChange={onOpenChange}
        showDefaultFooter={false}
        title={`ویرایش رمزعبور برای ${userToUpdate?.username}`}
        description=""
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <ChangePasswordForm onSubmit={handleSubmit} isPending={isLoading} />
      </Sidebar>
    </FormProvider>
  );
}
