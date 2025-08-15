import { useEditUserProposal, useUserProposal } from '@/lib/hooks';
import { ProposalResponse } from '@/lib/types';
import { FileUpload } from '@/ui/components/file-upload';
import { FormInput } from '@/ui/components/input/input';
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

  const { data, isLoading } = useUserProposal(selected?.id ?? 0, {
    enabled: !!selected?.id,
    queryKey: ['userProposal', selected?.id],
  });

  const removeExistingFile = () => setFileId(null);

  const { mutateAsync, isPending } = useEditUserProposal();

  const queryClient = useQueryClient();

  const onSubmit = async (data: ProposalUpdateFormValues) => {
    try {
      await mutateAsync({
        proposalId: selected?.id ?? 0,
        // FIXME:
        data: { startAt: '', endAt: '', fileId: 1 },
      });
      onOpenChange(false);
      queryClient.invalidateQueries();
      form.reset();
      toast.success('پروپوزال با موفقیت ویرایش شد');
    } catch (e) {
      toast.error('خطا در ویرایش پروپوزال');
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
            <FormInput
              name="info"
              label="عنوان"
              placeholder="عنوان کمیسیون را وارد کنید"
            />
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
                title="بارگذاری فایل جدید RFP"
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
