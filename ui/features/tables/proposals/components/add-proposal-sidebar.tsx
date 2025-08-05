import { useAddUserProposal, useSearchRfps } from '@/lib/hooks';
import { Sidebar } from '@/ui/components/sidebar/sidebar';
import { ProposalResponse } from 'lib/types/proposalResponse';
import { useForm, FormProvider } from 'react-hook-form';
import { FormSelect } from '@/ui/components/select/select';
import { FormInput } from '@/ui/components/input/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { proposalSchema, ProposalFormValues } from './proposal-validation';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { FileUpload } from '@/ui/components/file-upload';
import { useState } from 'react';

interface ProposalSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddProposalSideBar({
  open,
  onOpenChange,
}: ProposalSidebarProps) {
  const { data: rfps = [] } = useSearchRfps(
    {},
    {
      enabled: open,
      queryKey: ['broker-users-supervisor'],
    }
  );

  const form = useForm<ProposalFormValues>({
    resolver: zodResolver(proposalSchema),
  });

  const [fileId, setFileId] = useState<number | null>(null);

  const { mutateAsync, isPending } = useAddUserProposal();

  const queryClient = useQueryClient();

  const onSubmit = async (data: ProposalFormValues) => {
    try {
      await mutateAsync({ ...data, fileId });
      onOpenChange(false);
      queryClient.invalidateQueries({
        queryKey: ['userProposals'],
      });
      form.reset();
      toast.success('پروپوزال با موفقیت ایجاد شد');
    } catch (e) {
      toast.error('خطا در ایجاد پروپوزال');
    }
  };

  const handleUploadComplete = (val: any) => {
    toast.success('فایل با موفقیت بارگذاری شد');
    setFileId(val.id);
  };

  return (
    <FormProvider {...form}>
      <Sidebar
        open={open}
        onOpenChange={onOpenChange}
        title={`ایجاد پروپوزال جدید`}
        description=""
        onSubmit={form.handleSubmit(onSubmit)}
        isLoading={isPending}
      >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            name="info"
            label="عنوان"
            placeholder="عنوان کمیسیون را وارد کنید"
          />
          <FormSelect
            name="RFP_id"
            placeholder="وضعیت را انتخاب کنید"
            label="وضعیت"
            options={rfps.map((u) => ({
              value: u.id,
              label: `${u.info}`,
            }))}
          />
          <FormInput
            name="comment"
            label="توضیحات"
            placeholder="توضیحات کمیسیون را وارد کنید"
            multiline
            rows={4}
          />
          <FileUpload
            onUploadComplete={handleUploadComplete}
            title="بارگذاری فایل جدید RFP"
          />
        </form>
      </Sidebar>
    </FormProvider>
  );
}
