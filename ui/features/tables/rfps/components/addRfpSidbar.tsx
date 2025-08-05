import { useAddExplorerRfp, useExplorerRfpFields } from '@/lib/hooks';
import { Sidebar } from '@/ui/components/sidebar/sidebar';
import { useForm, FormProvider } from 'react-hook-form';
import { FormSelect } from '@/ui/components/select/select';
import { FormInput } from '@/ui/components/input/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { RFPFormValues, rfpRequestSchema } from './rfpFormValidaton';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { FileUpload } from '@/ui/components/file-upload';
import { useState } from 'react';

interface RFPSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddRFPSidebar({ open, onOpenChange }: RFPSidebarProps) {
  const form = useForm<RFPFormValues>({
    resolver: zodResolver(rfpRequestSchema),
  });

  const [fileId, setFileId] = useState<number | null>(null);

  const { mutateAsync, isPending } = useAddExplorerRfp();

  const { data = [] } = useExplorerRfpFields(
    {},
    { queryKey: ['explorerRfpFields', {}], enabled: open }
  );

  const onUploadComplete = (val: any) => {
    toast.success('فایل با موفقیت بارگذاری شد');
    setFileId(val.id);
  };

  const queryClient = useQueryClient();

  const onSubmit = async (data: RFPFormValues) => {
    try {
      console.log(data);
      await mutateAsync({ ...data, RFP_field_id: data.RFP_field_id, fileId });
      onOpenChange(false);
      queryClient.invalidateQueries({
        queryKey: ['explorerRfps'],
      });
      form.reset();
      toast.success('rfp با موفقیت ایجاد شد');
    } catch (e) {
      toast.error('خطا در ایجاد rfp');
    }
  };

  return (
    <FormProvider {...form}>
      <Sidebar
        open={open}
        onOpenChange={onOpenChange}
        title={`ایجاد کمیسیون`}
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
            name="RFP_field_id"
            placeholder="دسته بندی RFP را انتخاب کنید"
            label="دسته بندی RFP"
            options={data.map((u) => ({
              value: u.id,
              label: `${u.title}`,
            }))}
          />
          <FileUpload
            onUploadComplete={onUploadComplete}
            title="بارگذاری فایل RFP"
          />
        </form>
      </Sidebar>
    </FormProvider>
  );
}
