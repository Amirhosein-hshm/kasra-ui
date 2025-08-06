import {
  useEditExplorerRfp,
  useExplorerRfpFields,
  useGetExplorerRfpById,
} from '@/lib/hooks';
import { Sidebar } from '@/ui/components/sidebar/sidebar';
import { useForm, FormProvider } from 'react-hook-form';
import { FormSelect } from '@/ui/components/select/select';
import { FormInput } from '@/ui/components/input/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { RFPFormValues, rfpRequestSchema } from './rfpFormValidaton';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { FileUpload } from '@/ui/components/file-upload';
import { useEffect, useState } from 'react';
import { IconX } from '@tabler/icons-react';
import { RFPSidebarSkeleton } from './loading/editRfpSidbarloading';
import FileDownload from '@/ui/features/file-download/fileDownload';

interface EditRFPSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selected: RFPResponse;
}

export interface RFPResponse {
  id: number;
  info: string;
  RFP_field_id: number;
  fileId?: number;
}

export function EditRFPSidebar({
  open,
  onOpenChange,
  selected,
}: EditRFPSidebarProps) {
  const form = useForm<RFPFormValues>({
    resolver: zodResolver(rfpRequestSchema),
  });

  const { data: fields = [], isSuccess } = useExplorerRfpFields(
    {},
    { queryKey: ['explorerRfpFields', {}], enabled: open }
  );

  const { data, isPending: getGetExplorerRfpByIdLoading } =
    useGetExplorerRfpById(selected.id, {
      enabled: isSuccess,
      queryKey: ['explorerRfpById', selected.id],
    });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (data && selected) {
      // @ts-ignore
      form.setValue('RFP_field_id', data.rfpField.id);
      form.setValue('info', data.info);
      setFileId(selected.fileId ?? null);
    }
  }, [data, selected, getGetExplorerRfpByIdLoading, fields.length]);

  const [fileId, setFileId] = useState<number | null>(selected.fileId ?? null);
  const handleUploadComplete = (val: any) => {
    toast.success('فایل با موفقیت بارگذاری شد');
    setFileId(val.id);
  };
  const removeExistingFile = () => setFileId(null);

  const { mutateAsync, isPending } = useEditExplorerRfp();

  const handleClose = () => {
    queryClient.removeQueries({ queryKey: ['explorerRfpById', selected.id] });
    onOpenChange(false);
    form.reset();
  };

  const onSubmit = async (data: RFPFormValues) => {
    try {
      await mutateAsync({
        rfpId: selected.id,
        rFPRequest: {
          ...data,
          RFP_field_id: data.RFP_field_id,
          fileId,
        },
      });
      toast.success('RFP با موفقیت به‌روزرسانی شد');
      handleClose();
      queryClient.invalidateQueries({ queryKey: ['explorerRfps'] });
    } catch {
      toast.error('خطا در ویرایش RFP');
    }
  };

  return (
    <FormProvider {...form}>
      <Sidebar
        open={open}
        onOpenChange={handleClose}
        title="ویرایش کمیسیون"
        onSubmit={form.handleSubmit(onSubmit)}
        isLoading={isPending}
      >
        {true ? (
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              name="info"
              label="عنوان"
              placeholder="عنوان کمیسیون را وارد کنید"
            />
            <FormSelect
              name="RFP_field_id"
              placeholder="دسته‌بندی RFP را انتخاب کنید"
              label="دسته‌بندی RFP"
              options={fields.map((f) => ({ value: f.id, label: f.title }))}
            />

            {fileId ? (
              <div className="relative mt-2 p-3 bg-gray-50 dark:bg-neutral-900 rounded-md">
                <FileDownload id={fileId!} />
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
          <RFPSidebarSkeleton />
        )}
      </Sidebar>
    </FormProvider>
  );
}
