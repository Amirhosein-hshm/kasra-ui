import { useAdminUpdateUser, useAdminUserRoles } from '@/lib/hooks/useAdmin';
import { UserInfoResponse } from '@/lib/types';
import Spinner from '@/ui/common/spinner';
import { Sidebar } from '@/ui/components/sidebar/sidebar';
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

interface EditUserSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userToUpdate?: UserInfoResponse;
}

export function EditUserSidebar({
  open,
  onOpenChange,
  userToUpdate,
}: EditUserSidebarProps) {
  const isUpdateMode = !!userToUpdate;
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(editUserFormSchema),
    defaultValues: editUserFormDefaultValues,
  });

  useEffect(() => {
    if (userToUpdate) {
      form.reset({
        active: userToUpdate.active ?? true,
        address: userToUpdate.address ?? '',
        birth: userToUpdate.birth,
        father_name: userToUpdate.fatherName ?? '',
        fname: userToUpdate.fname ?? '',
        lname: userToUpdate.lname ?? '',
        phone: userToUpdate.phone ?? '',
        resume_file_id: userToUpdate.resumeFileId ?? -1,
        user_type_id: userToUpdate.userTypeId ?? '',
        username: userToUpdate.username,
      });
    } else {
      form.reset(editUserFormDefaultValues);
    }
  }, [userToUpdate]);

  const adminUserRolesQuery = useAdminUserRoles();
  const userRoles = adminUserRolesQuery.data;
  const rolesAreReady = adminUserRolesQuery.isSuccess && userRoles;

  const adminEditUserMutation = useAdminUpdateUser();

  const handleSubmit = async (data: EditUserFormData) => {
    setIsLoading(true);
    if (!userToUpdate) return;
    try {
      await adminEditUserMutation.mutateAsync({
        userId: userToUpdate?.id,
        userAddRequest: {
          ...data,
          fatherName: data.father_name,
          userTypeId: data.user_type_id,
          birth: data.birth.split('T')[0],
        },
      });

      toast.success(`کابر با موفقیت ${isUpdateMode ? 'ویرایش' : 'افزوده'} شد`);
      onOpenChange(false);
    } catch (error) {
      console.error('خطا در ارسال فرم:', error);
      toast.error('خطایی رخ داد');
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
        title="ویرایش کاربر"
        description=""
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        {rolesAreReady ? (
          <EditUserForm
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
