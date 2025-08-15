import { useEditUserProposal, useUserProposal } from '@/lib/hooks';
import { ProposalResponse } from '@/lib/types';
import { FileUpload } from '@/ui/components/file-upload';
import { Sidebar } from '@/ui/components/sidebar/sidebar';
import FileDownloadLink from '@/ui/features/file-download/FileDownloadLink';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconX } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  ProposalUpdateFormValues,
  proposalUpdateSchema,
} from './edit-proposal-validation';
import { EditProposalSidebarSkeleton } from './loading/EditProposalSidebarSkeleto';
import { PersianDatePicker } from '@/ui/components/date-picker/date-picker';

interface ProposalSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selected?: ProposalResponse | null;
}

export function EditProposalSideBar({
  open,
  onOpenChange,
  selected,
}: ProposalSidebarProps) {
  const form = useForm<ProposalUpdateFormValues>({
    resolver: zodResolver(proposalUpdateSchema),
  });

  const [fileId, setFileId] = useState<number | null>(null);

  const { isLoading } = useUserProposal(selected?.id ?? 0, {
    enabled: !!selected?.id,
    queryKey: ['userProposal', selected?.id],
  });

  const removeExistingFile = () => setFileId(null);

  const { mutateAsync, isPending } = useEditUserProposal();

  const queryClient = useQueryClient();

  const onSubmit = async (data: ProposalUpdateFormValues) => {
    console.log('clicked');
    if (!fileId) {
      toast.error('بارگذاری فایل پروپوزال اجباری است');
      return;
    }
    try {
      await mutateAsync({
        proposalId: selected?.id ?? 0,
        data: {
          startAt: data.startAt.toISOString(),
          endAt: data.endAt.toISOString(),
          fileId,
        },
      });
      onOpenChange(false);
      queryClient.invalidateQueries();
      form.reset();
      toast.success('پروپوزال با موفقیت تکمیل شد');
    } catch (e) {
      toast.error('خطا در تکمیل پروپوزال');
    }
  };

  const handleUploadComplete = (val: any) => {
    toast.success('فایل با موفقیت بارگذاری شد');
    setFileId(val.id);
  };

  useEffect(() => {
    form.reset();
    setFileId(null);
  }, [selected, form]);

  return (
    <FormProvider {...form}>
      <Sidebar
        open={open}
        onOpenChange={onOpenChange}
        title={`پروپوزال ${selected?.id ?? ''}`}
        description=""
        onSubmit={form.handleSubmit(onSubmit)}
        isLoading={isPending}
      >
        {!isLoading ? (
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col gap-1">
              <div className="text-red-400 font-light text-sm">
                {form.formState.errors.startAt?.message}
              </div>
              <div className="flex items-center gap-2">
                <label>تاریخ شروع: </label>
                <PersianDatePicker
                  onChange={(date) => {
                    form.setValue('startAt', date.toDate());
                  }}
                />
              </div>
            </div>

            <div>
              <div className="text-red-400 font-light text-sm">
                {form.formState.errors.endAt?.message}
              </div>
              <div className="flex items-center gap-2">
                <label>تاریخ پایان: </label>
                <PersianDatePicker
                  onChange={(date) => {
                    form.setValue('endAt', date.toDate());
                  }}
                />
              </div>
            </div>
            {fileId ? (
              <div className="relative mt-2 p-3 bg-gray-50 dark:bg-neutral-900 rounded-md">
                <FileDownloadLink id={fileId!} />
                <button
                  type="button"
                  onClick={removeExistingFile}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  title="حذف فایل"
                >
                  <IconX size={14} />
                </button>
              </div>
            ) : (
              <FileUpload
                onUploadComplete={handleUploadComplete}
                title="بارگذاری فایل پروپوزال"
              />
            )}
          </form>
        ) : (
          <EditProposalSidebarSkeleton />
        )}
      </Sidebar>
    </FormProvider>
  );
}
