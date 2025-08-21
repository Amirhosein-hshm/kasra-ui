import { useAdminAddUser, useAdminUserRoles } from '@/lib/hooks/useAdmin';
import { UserInfoResponse } from '@/lib/types';
import Spinner from '@/ui/common/spinner';
import { Sidebar } from '@/ui/components/sidebar/sidebar';
import AddUserForm from '@/ui/forms/add-user.form';
import {
  UserFormData,
  userFormDefaultValues,
  userFormSchema,
} from '@/ui/forms/add-user.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface AddUserSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userToUpdate?: UserInfoResponse;
}

export function AddUserSidebar({
  open,
  onOpenChange,
  userToUpdate,
}: AddUserSidebarProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(userFormSchema),
    defaultValues: userFormDefaultValues,
  });

  const adminUserRolesQuery = useAdminUserRoles();
  const userRoles = adminUserRolesQuery.data;
  const rolesAreReady = adminUserRolesQuery.isSuccess && userRoles;

  const adminAddUserMutation = useAdminAddUser();

  const handleSubmit = async (data: UserFormData) => {
    setIsLoading(true);
    try {
      await adminAddUserMutation.mutateAsync({
        ...data,
        fatherName: data.father_name,
        userTypeId: data.user_type_id,
        birth: data.birth.split('T')[0],
      });
      toast.success('کابر با موفقیت افزوده شد');
      onOpenChange(false);
    } catch (error) {
      console.error('خطا در ارسال فرم:', error);
      alert('خطایی در ارسال فرم رخ داد.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...form}>
      <Sidebar
        open={open}
        onOpenChange={onOpenChange}
        showDefaultFooter={false}
        title="افزودن کاربر"
        description=""
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        {rolesAreReady ? (
          <AddUserForm
            userToUpdate={userToUpdate}
            userRoles={userRoles}
            onSubmit={handleSubmit}
            isPending={isLoading}
          />
        ) : (
          <Spinner />
        )}
      </Sidebar>
    </FormProvider>
  );
}
